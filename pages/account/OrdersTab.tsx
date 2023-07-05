import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiCurrencyDollar } from "react-icons/hi";
import Payment from "./Payment";

function OrdersTab({ orders, paid, setPaid, user }: any) {
  const [payment, setPayment] = useState(false);
  const [orderDetail, setOrderDetail] = useState([] as any);
  const router = useRouter();
  const { t } = useTranslation("");

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
                order.paymentMethod === "online" ? (
                  <a
                    className="capitalize border border-green-600 bg-green-200 text-green-600 rounded-md font-medium hover:bg-green-300 py-1 px-2 text-xs cursor-pointer absolute right-2 top-2 flex items-center gap-1"
                    onClick={(e: any) => {
                      setPayment(!payment);
                      setPaid(false);
                      setOrderDetail(order);
                    }}
                  >
                    <div>{t("thanh toán")}</div>
                    <HiCurrencyDollar className="text-base" />
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

              <div className="flex justify-between items-center border-t border-gray-400 my-3 text-sm pl-2 pt-3">
                <div className="w-9/12">
                  <p className="font-medium">{t("Địa chỉ giao hàng:")}</p>
                  <div className="pl-2">
                    <div className="flex gap-1 imtes-center mt-1">
                      <p className="capitalize">{user.username}</p>
                      <p>{order.phone}</p>
                    </div>
                    <p className="w-full">{order.address}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end justify-center w-3/12">
                  <p>{order.createdAt.substring(0, 10)}</p>
                  <p>{order.createdAt.substring(11, 16)}</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-gray-400 my-3 text-sm pl-2 pb-3">
                <div>
                  <p className="font-medium">{t("Phương thức vận chuyển:")}</p>
                  <div className="pl-2 capitalize mt-1">
                    {order.transportBy}
                  </div>
                </div>
                <div>
                  <p className="font-medium">{t("Phương thức thanh toán:")}</p>
                  <div className="pl-2 capitalize text-end mt-1">
                    {order.paymentMethod}
                  </div>
                </div>
              </div>

              <div className="text-xs p-2">
                {order?.orderItems?.map((item: any) => {
                  return (
                    <div
                      key={item?.id}
                      className="flex items-center justify-between mb-3"
                    >
                      <Link
                        href={`/product/${item?.product?.slug}`}
                        className="flex items-center gap-2"
                      >
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
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            {item?.itemType?.variantAttribute?.map(
                              (res: any) => {
                                return (
                                  <p key={res.id}>{res.attribute.value}</p>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </Link>

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
                <div className="font-medium text-blue-600 capitalize">
                  {order.status}
                </div>
              </div>
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
      {/* thanh toán */}
      <Payment
        payment={payment}
        setPayment={setPayment}
        paid={paid}
        setPaid={setPaid}
        orderDetail={orderDetail}
      />
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
