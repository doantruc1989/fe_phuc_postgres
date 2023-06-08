import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../other/useAxiosPrivate";

function OrdersTab({ orders, paid, setPaid }: any) {
  const [payment, setPayment] = useState(false);
  const [orderId, setOrderId] = useState<number>();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const { t } = useTranslation("");

  const handlePay = (e: any) => {
    e.preventDefault();
    const user =
      typeof Storage === "undefined"
        ? {}
        : JSON.parse(localStorage.getItem("user") || "{}");
    const id = user.id;

    axiosPrivate
      .put(`/cart/order/${orderId}`, {
        isPaid: true,
      })
      .then(() => {
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
              {order.isPaid === false ? (
                order.paymentMethod === "bank" ||
                order.paymentMethod === "momo" ? (
                  <a
                    className="text-blue-600 text-xs cursor-pointer absolute right-2 top-3"
                    onClick={(e: any) => {
                      setPayment(!payment);
                      setPaid(false);
                      setOrderId(order.id);
                    }}
                  >
                    <div>{t("thanh toán")}</div>
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
                <p className="font-medium text-sm">{t("Đơn Hàng:")}</p>
                <p className="font-medium text-green-500">{order.id}</p>
              </div>

              <div className="flex justify-between items-center border-b border-t border-gray-400 my-3 text-sm pl-2 py-3">
                <div className="w-9/12">
                  <p className="font-medium">{t("Địa chỉ giao hàng:")}</p>
                  <div className="pl-2">
                    <div className="flex gap-1 imtes-center">
                      <p>{order.username}</p>
                      <p>{order.phone}</p>
                    </div>
                    <p className="w-full">{order.address}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">
                      {t("Phương thức vận chuyển:")}
                    </p>
                    <div className="pl-2">
                      {order.trans == 35000 ? (
                        <p>{t("Tiêu chuẩn")}</p>
                      ) : (
                        <p>{t("Hoả tốc")}</p>
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
                      key={item?.id}
                      className="flex items-center justify-between mb-3"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="w-10 h-10 my-1"
                          src={item?.product?.productimage[0]?.url}
                          alt=""
                        />
                        <div className="flex flex-col items-start">
                          <span>
                            {router.locale === "default"
                              ? item?.product?.productName
                              : item?.name}{" "}
                            {" x "} {item.quantity}
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

              <div className="px-2 flex justify-between items-center p border-t border-gray-400 pt-2">
                <p className="font-medium text-sm">{t("Phí Vận chuyển:")}</p>
                <p className="text-sm font-medium">
                  {Intl.NumberFormat().format(order.trans) + " đ"}
                </p>
              </div>
              <div className="px-2 flex justify-between items-center pt-2">
                <p className="font-medium">{t("Tổng Tiền:")}</p>
                <p className="text-red-600 font-medium text-xl">
                  {Intl.NumberFormat().format(order.cartTotal)}đ
                </p>
              </div>
              <div className="flex justify-center gap-1 text-xs">
                <p>{t("Trạng thái:")}</p>
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
                              {t("Thanh Toán đơn hàng")}
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
                                  {t("thanh toán thành công!!!")}
                                </p>
                              </div>
                            ) : null}
                            <Button
                              className="my-3 mx-auto"
                              onClick={handlePay}
                            >
                              {t("thanh toán")}
                            </Button>
                          </>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col gap-5 items-center my-10">
          <p className="text-lg font-medium">{t("Bạn chưa có đơn hàng nào")}</p>
          <Link className="text-lg text-blue-600" href={"/giatotmoingay"}>
            {t("Mua sắm ngay thôi nào!")}
          </Link>
        </div>
      )}
    </div>
  );
}
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default OrdersTab;
