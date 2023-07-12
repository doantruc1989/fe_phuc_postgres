import React, { useEffect, useRef, useState } from "react";
import HeadSeo from "./HeadSeo";
import Footera from "./Footer";
import TopBar from "./TopBar";
import { Sidebar } from "primereact/sidebar";
import Link from "next/link";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import SidebarComp from "./SidebarComp";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChatConversation from "./ChatConversation";
import { HiOutlineChat, HiOutlineEye } from "react-icons/hi";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("");
  const [user, setUser] = useState([] as any);
  const [showChat, setShowChat] = useState(false);
  const chatRef: any = useRef();

  // useEffect(() => {
  //   let handler = (e: any) => {
  //     if (!chatRef.current?.contains(e.target)) {
  //       setShowChat(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // }, []);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : "";
    setUser(user);
  }, []);

  const prop = {
    title: "PhucFresh trái cây tươi",
    keywords: "trai cay nhap khau tuoi xanh ngot nho xoai cam buoi vietgap",
    description: "trai cay tuoi xanh sach ho chi minh sai gon",
  };
  return (
    <React.Fragment>
      <HeadSeo prop={prop} />
      <TopBar visible={visible} setVisible={setVisible} />
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div className="w-full">
            <div className="flex flex-col items-center">
              <img
                className="w-14 h-14 rounded-full"
                src="/image/logo.png"
                alt="logo"
              />
              {user?.id === undefined ? (
                <div className="flex justify-around gap-10 mt-3 font-medium w-full py-3">
                  <Link
                    className="hover:bg-green-100 px-3 py-2 rounded-lg"
                    href={"/login"}
                  >
                    {t("Đăng nhập")}
                  </Link>
                  <Link
                    className="hover:bg-green-100 px-3 py-2 rounded-lg"
                    href={"/register"}
                  >
                    {t("Đăng ký")}
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2 mt-3 font-medium w-full py-3">
                  <p>Welcome back,</p>
                  <div className="flex items-center gap-2">
                    <p>{user?.username}</p>
                    <img
                      className="h-5 w-5 rounded-full object-cover"
                      src={user.image}
                      alt="avatar"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="w-full mx-auto">
              <SidebarComp />
            </div>
          </div>
        </Sidebar>
      </div>
      <main>{children}</main>
      <div
        ref={chatRef}
        className="fixed z-50 bottom-20 md:bottom-20 left-0 md:left-2 w-full md:w-1/2 lg:w-1/3"
      >
        {showChat ? (
          <div
            // className={showChat=== true ? 'displayed-chat w-11/12 bg-gray-100 rounded-lg mx-auto h-fit border-green-600 border' : 'w-11/12 bg-gray-100 rounded-lg mx-auto h-fit border-green-600 border display-chat'}>
            className="w-11/12 bg-gray-100 rounded-lg mx-auto h-fit border-green-600 border display-chat"
          >
            <div className="font-medium py-2 border-b">
              <p className="text-center">Customer Service</p>
            </div>
            <ChatConversation />
          </div>
        ) : null}

        <Link
          onClick={() => {
            setShowChat(!showChat);
          }}
          href={"#"}
          className="flex items-center justify-center fixed z-50 bottom-[24px] left-[24px] text-center bg-green-600 rounded-full p-3 w-[44px] h-[44px]"
        >
          <HiOutlineChat className="w-[24px] h-[24px] text-white text-center" />
        </Link>
      </div>
      <Footera />
    </React.Fragment>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Layout;
