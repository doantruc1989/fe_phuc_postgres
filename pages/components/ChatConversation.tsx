import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineCheck,
  HiOutlineCloudDownload,
  HiOutlineEmojiHappy,
} from "react-icons/hi";
import { socket } from "../../other/socketIo";
import useAxiosPrivate from "../../other/useAxiosPrivate";
import dayjs from "dayjs";

const ChatConversation = () => {
  const [chatUser, setChatUser] = useState("");
  const [messagesFromApi, setMessagesFromApi] = useState([] as any);
  const [typingStatus, setTypingStatus] = useState([] as any);
  const messagesEndRef: any = useRef();
  const sendRef: any = useRef();
  const axiosPrivate = useAxiosPrivate();
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user =
    typeof Storage === "undefined"
      ? {}
      : JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    let handler = (e: any) => {
      if (!sendRef.current?.contains(e.target)) {
        socket.emit("typingResponse", {
          userId: user.socketId,
          content: "none",
        });
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const scrollToLastMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [messagesFromApi]);

  useEffect(() => {
    socket.on("userTyping", (data: any) => {
      setTypingStatus(data);
    });

    return () => {
      socket.off("userTyping");
    };
  }, [socket]);

  useEffect(() => {
    try {
      axiosPrivate
        .get(`messenger?page=${page}&take=20&filter=${user?.socketId}`)
        .then((res: any) => {
          const messages = res.data[0];
          messages.reverse();
          setMessagesFromApi([...messages, ...messagesFromApi]);
          setTotalItems(res.data[1]);
        });
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    socket.on("chatfromAdmin", (data: any) => {
      setMessagesFromApi((list: any) => [...list, data]);
    });

    return () => {
      socket.off("chatfromAdmin");
    };
  }, [socket]);

  const handleSendMessages = async () => {
    const data = {
      myId: user.socketId,
      room: user.socketId,
      text: text,
    };
    sendRef.current.focus();
    socket.emit("startToChat", data);
    socket.emit("typingResponse", {
      userId: user.socketId,
      content: "none",
    });
    setText("");
  };

  const handleSetName = async () => {
    const data = {
      socketId: socket.id,
      userId: user?.id === undefined ? null : user?.id,
      name: user?.id === undefined ? chatUser : user?.username,
    };
    if (user?.id === undefined) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          socketId: socket.id,
          userId: user?.id === undefined ? null : user?.id,
          name: user?.id === undefined ? chatUser : user?.username,
        })
      );
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, socketId: data.socketId })
      );
    }
    socket.emit("connection", data);
  };

  return (
    <div className="w-full text-sm pb-2 px-1">
      {user?.socketId === undefined ? (
        <div className="flex flex-col gap-2 items-center justify-center">
          <div>
            <Label>Nick name:</Label>
            <TextInput
              value={chatUser}
              placeholder={
                user?.id === undefined ? "your nick name" : user.username
              }
              onChange={(e: any) => {
                setChatUser(e.target.value);
              }}
              onKeyDown={(event: any) => {
                if (event.key === "Enter") {
                  handleSetName();
                }
              }}
            />
          </div>
          <Button onClick={handleSetName}>Start</Button>
        </div>
      ) : (
        <div className="relative h-fit pb-14">
          <div className="pb-4 chat-conversation">
            {totalItems <= 20 ? null : (
              <div>
                {isLoading === true ? (
                  <div className="flex items-center gap-2 my-4 w-full justify-center">
                    <Spinner color="success" />
                    <p>Loading...</p>
                  </div>
                ) : messagesFromApi?.length % 20 === 0 ? (
                  <button
                    className="flex items-center gap-2 my-4 w-full justify-center text-green-700 font-medium"
                    onClick={() => {
                      setIsLoading(true);
                      const isSuccess = setTimeout(() => {
                        setPage(page + 1);
                        setIsLoading(false);
                      }, 2000);
                      return () => {
                        clearTimeout(isSuccess);
                      };
                    }}
                  >
                    <HiOutlineCloudDownload className="text-xl" />
                    <p>Load more...</p>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 my-4 w-full justify-center text-green-700 font-medium">
                    <HiOutlineEmojiHappy className="text-xl" />
                    <p>No more to load</p>
                  </div>
                )}
              </div>
            )}

            {messagesFromApi
              ? messagesFromApi.map((item: any) => {
                  return (
                    <div
                      ref={messagesEndRef}
                      className="w-full px-1 text-sm"
                      key={item.id}
                    >
                      <div
                        className={`${
                          item.admin !== null
                            ? "flex flex-col justify-start items-start mt-4"
                            : "flex flex-col justify-end items-end mt-3"
                        }`}
                      >
                        <div
                          className={`${
                            item.admin !== null
                              ? "flex flex-row-reverse items-center gap-2"
                              : "flex items-center gap-2"
                          }`}
                        >
                          <p className="text-[9px]">
                            {dayjs(item.createdAt).format("MMM D, HH:mm")}
                          </p>

                          <p
                            className={`${
                              item.admin !== null
                                ? "w-fit border border-gray-200 bg-gray-200 px-3 py-1 rounded-2xl shadow-lg text-justify"
                                : "w-fit border border-green-600 bg-green-600 text-white px-3 py-1 rounded-2xl shadow-lg text-justify"
                            }`}
                          >
                            {item.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          {typingStatus?.content === "none" ||
          typingStatus?.content !== "Admin is typing" ? null : (
            <div className="text-xs pl-3 flex items-center gap-2 mt-3 font-medium">
              <Spinner color="success" size={"xs"} />
              <p>{typingStatus?.content}</p>
            </div>
          )}

          <div className="flex items-center gap-2 absolute bottom-0 w-full bg-gray-100">
            <TextInput
              ref={sendRef}
              color={"success"}
              className="flex-1"
              value={text}
              onChange={(e: any) => {
                if (e.target.value !== "") {
                  socket.emit("typingResponse", {
                    userId: user.socketId,
                    content: `${user.username || user.name} is typing`,
                  });
                } else {
                  socket.emit("typingResponse", {
                    userId: user.socketId,
                    content: "none",
                  });
                }
                setText(e.target.value);
              }}
              onKeyDown={(event: any) => {
                if (event.key === "Enter") {
                  handleSendMessages();
                }
              }}
            />
            <Button color={"success"} onClick={handleSendMessages}>
              <HiOutlineCheck className="text-lg font-medium" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatConversation;
