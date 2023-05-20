import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import useAxiosPrivate from "../../other/useAxiosPrivate";

function OrdersTab({ orders, paid, setPaid }: any) {
  const [payment, setPayment] = useState(false);
  const [orderId, setOrderId] = useState<number>();
  const axiosPrivate = useAxiosPrivate();

  const handlePay = (e: any) => {
    e.preventDefault();
    const user =
      typeof Storage === "undefined"
        ? {}
        : JSON.parse(localStorage.getItem("user") || "{}");
    const id = user.id;
    
    axiosPrivate
      .put(`/cart/order/${orderId}`, {
        status: true,
      })
      .then((res) => {
        setPaid(true);
      });
  };

  return (
    <div className="p-3">
      {orders ? (
        orders.map((order: any) => {
          
          return (
            <div
              key={order.id}
              className="relative my-5 p-2 border border-green-600 rounded-xl"
            >
              {order.status === false ? (
                order.isPaid === "bank" || order.isPaid === "momo" ? (
                  <a
                    className="text-blue-600 text-xs cursor-pointer absolute right-2 top-3"
                    onClick={(e: any) => {
                      setPayment(!payment);
                      setPaid(false);
                      setOrderId(order.id);
                    }}
                  >
                    <div>thanh toán</div>
                  </a>
                ) : null
              ) : (
                <img
                  className="h-7 w-auto absolute right-3"
                  src="/image/dathanhtoan.png"
                  alt=""
                />
              )}

              <div className="flex gap-2 items-center justify-center">
                <p className="font-medium text-sm">Đơn Hàng:</p>
                <p className="font-medium text-green-500">{order.id}</p>
              </div>

              <div className="flex justify-between items-center border-b border-t border-gray-400 my-3 text-sm pl-2 py-3">
                <div className="w-9/12">
                  <p className="font-medium">Địa chỉ giao hàng:</p>
                  <div className="pl-2">
                    <div className="flex gap-1 imtes-center">
                      <p>{order.username}</p>
                      <p>{order.phone}</p>
                    </div>
                    <p className="w-full">{order.address}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">Phương thức vận chuyển:</p>
                    <div className="pl-2">
                      {order.trans == 35000 ? (
                        <p>Tiêu chuẩn</p>
                      ) : (
                        <p>Hoả tốc</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end justify-center w-3/12">
                  <p>{order.createdAt.substring(0, 10)}</p>
                  <p>{order.createdAt.substring(11, 16)}</p>
                </div>
              </div>
              <div className="text-xs p-2">
                {order?.orderItems?.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="w-10 h-10 my-1"
                          src={item.image}
                          alt=""
                        />
                        <div className="flex flex-col items-start">
                          <span>
                            {item.productName + " x " + item.quantity}
                          </span>
                          <div className="flex justify-start gap-2">
                            <p className="text-gray-500">{item.type || null}</p>
                            {order.status === 3 ? (
                              <a
                                //   onClick={(e: any) => {
                                //     e.preventDefault;
                                //     setIsReview(!isReview);
                                //     setOrderItems(item.id.split(".")[0]);
                                //   }}
                                className="text-blue-500 cursor-pointer"
                              >
                                [đánh giá]
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="font-medium ml-5">
                        {Intl.NumberFormat().format(item.itemTotal) + "đ"}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* {isReview && (
                      <div className="mt-2">
                        <div className="my-1 flex gap-1 items-center">
                          <h1>Đánh giá:</h1>
                          <select
                            value={reviewStars}
                            onChange={(e: any) => {
                              setReviewStars(e.target.value);
                            }}
                            className="border rounded-lg w-full bg-blue-100 border-blue-500 text-blue-900"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <Textarea
                          value={reviewComment}
                          onChange={(e: any) => {
                            setReviewComment(e.target.value);
                          }}
                        />

                        <div className="flex justify-center mt-2">
                          <Button
                            size={"xs"}
                            onClick={() => {
                              axios
                                .post(
                                  `http://localhost:3006/v2/product/comment/`,
                                  {
                                    comment: reviewComment || "tuyệt vời",
                                    stars: reviewStars || 5,
                                    user: users.id,
                                    product: orderItems * 1,
                                  }
                                )
                                .then((res: any) => {
                                  setIsReview(false);
                                  setReviewComment("");
                                  setReviewStars(5);
                                });
                            }}
                          >
                            OK
                          </Button>
                        </div>
                      </div>
                    )} */}

              <div className="px-2 flex justify-between items-center p border-t border-gray-400 pt-2">
                <p className="font-medium text-sm">Phí Vận chuyển:</p>
                <p className="text-sm font-medium">
                  {Intl.NumberFormat().format(order.trans) + " đ"}
                </p>
              </div>
              <div className="px-2 flex justify-between items-center pt-2">
                <p className="font-medium">Tổng Tiền:</p>
                <p className="text-red-600 font-medium text-xl">
                  {Intl.NumberFormat().format(order.cartTotal)}đ
                </p>
              </div>
              <div className="flex justify-center gap-1 text-xs">
                <p>Trạng thái:</p>
                <div className="font-medium text-blue-600">
                  {order.status === false ? "Chưa thanh toán" : "Đã thanh toán"}
                </div>
              </div>

              {/* thanh toán */}
              <Transition appear show={payment} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={() => setPayment(!payment)}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 text-center">
                              Thanh Toán đơn hàng
                            </p>
                          </div>

                          <>
                            <div className="border border-blue-600 rounded-xl p-4 w-full mt-3  mx-auto">
                              <div className="flex justify-center gap-2">
                                <img
                                  className="w-auto h-8"
                                  src="/image/ttvisa.jpg"
                                  alt="visa"
                                />
                                <img
                                  className="w-auto h-8"
                                  src="/image/ttjcb.png"
                                  alt="visa"
                                />
                                <img
                                  className="w-auto h-8"
                                  src="/image/ttmastercard.png"
                                  alt="visa"
                                />
                              </div>

                              <div className="mt-3">
                                <div className="mb-2 block">
                                  <Label htmlFor="email1" value="Name:" />
                                </div>
                                <TextInput
                                  id="email1"
                                  placeholder="Tên chủ thẻ"
                                  required={true}
                                />
                              </div>

                              <div className="mt-3">
                                <div className="mb-2 block">
                                  <Label
                                    htmlFor="email2"
                                    value="Card number:"
                                  />
                                </div>
                                <TextInput
                                  id="email2"
                                  placeholder="Số thẻ"
                                  required={true}
                                />
                              </div>

                              <div className="flex w-full mt-3 gap-5">
                                <div className="w-full">
                                  <div className="mb-2 block">
                                    <Label
                                      htmlFor="email3"
                                      value="Expiration (mm/yy):"
                                    />
                                  </div>
                                  <TextInput
                                    id="email3"
                                    placeholder="Ngày hết hạn"
                                    required={true}
                                    className="w-full"
                                  />
                                </div>
                                <div className="w-full">
                                  <div className="mb-2 block">
                                    <Label
                                      htmlFor="email4"
                                      value="Security Code:"
                                    />
                                  </div>
                                  <TextInput
                                    id="email4"
                                    placeholder="Mã số bí mật"
                                    required={true}
                                    className="w-full"
                                  />
                                </div>
                              </div>
                            </div>
                            {paid ? (
                              <div className="flex justify-center mt-3">
                                <p className="mx-auto mb-3 text-green-500 font-medium text-lg">
                                  Pay successfully!!!
                                </p>
                              </div>
                            ) : null}
                            <Button
                              className="my-3 mx-auto"
                              onClick={handlePay}
                            >
                              Pay now
                            </Button>
                          </>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              {/* xac nhan nhan hang */}
              {/* <Transition appear show={isReceived} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setIsReceived(!isReceived)}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="mt-2">
                                  <div>
                                    <p className="text-sm text-gray-500 text-center">
                                      Xác nhận đã nhận hàng?
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-evenly my-6">
                                    <Button
                                      onClick={(e: any) => {
                                        e.preventDefault;
                                        setIsConfirm(!isConfirm);
                                      }}
                                      color={"failure"}
                                      size="xs"
                                    >
                                      Trả hàng / Hoàn Tiền
                                    </Button>

                                    <Button
                                      color={"info"}
                                      size="xs"
                                      onClick={(e: any) => {
                                        e.preventDefault;
                                        axios
                                          .patch(
                                            `http://localhost:3006/cart/admin/listorder/${orderId}`,
                                            {
                                              status: 3,
                                            }
                                          )
                                          .then((res: any) => {
                                            setIsConfirm(false);
                                            setIsConfirmYes(true);
                                            setTimeout(() => {
                                              setIsReceived(false);
                                              setIsConfirmYes(false);
                                            }, 5000);
                                          });
                                      }}
                                    >
                                      Đã nhận
                                    </Button>
                                  </div>
                                  {isConfirm && (
                                    <div className="flex items-center justify-center">
                                      <p className="text-xs text-red-400">
                                        Chức năng đang phát triển
                                      </p>
                                    </div>
                                  )}
                                  {isConfirmYes && (
                                    <div className="flex items-center justify-center">
                                      <p className="text-xs text-green-400 text-center">
                                        Xác nhận bạn đã nhận hàng. Hệ thống sẽ
                                        chuyển bạn đến trang đánh giá. Vui lòng
                                        đợi 1 chút!
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition> */}
            </div>
          );
        })
      ) : (
        <div className="flex flex-col gap-5 items-center my-10">
          <p className="text-lg font-medium">Bạn chưa có đơn hàng nào</p>
          <Link className="text-lg text-blue-600" href={"/giatotmoingay"}>
            Mua sắm ngay thôi nào!
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrdersTab;
