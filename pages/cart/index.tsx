import { Breadcrumb, Button, Table } from "flowbite-react";
import React, { Fragment, ReactElement, useState } from "react";
import { CartProvider, useCart } from "react-use-cart";
import Layout from "../components/Layout";
import { HiChevronLeft, HiChevronRight, HiHome } from "react-icons/hi";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

function Index() {
  const { totalUniqueItems, items, updateItemQuantity, cartTotal } = useCart();
  const router = useRouter();
  const [delModal, setDelModal] = useState(false);
  const [itemId, setItemId] = useState("");
  const { t } = useTranslation("");
  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en" : "/"}
          icon={HiHome}
        >
          {t("Trang chủ")}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t("Giỏ hàng")}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="w-full lg:w-11/12 mx-auto relative">
        <h1 className="text-2xl font-medium flex justify-center my-6">
          {t("Giỏ hàng của bạn")}
        </h1>
        {totalUniqueItems > 0 ? (
          <div className="grid lg:grid-cols-4 w-full gap-10 mb-10">
            <div className="lg:col-start-1 lg:col-end-4 w-full rounded-lg mx-auto mb-6">
              <Table striped={true}>
                <Table.Head>
                  <Table.HeadCell></Table.HeadCell>
                  <Table.HeadCell className="hidden lg:block">
                    {t("Tên sản phẩm")}
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <p className="text-end">{t("Đơn giá")}</p>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <p className="text-center">{t("Số lượng")}</p>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <p className="text-end">{t("Tổng")}</p>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {items.map((item: any) => {
                    return (
                      <Table.Row
                        className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
                        key={item.id}
                      >
                        <Table.Cell className="py-0 pl-0">
                          <div className="pl-4 flex justify-start items-center mx-auto">
                            <Link
                              href={
                                router.locale === "en"
                                  ? `/en/product/${item.slug}`
                                  : `/product/${item.slug}`
                              }
                            >
                              <img
                                src={item.image}
                                className="w-14 h-14 object-cover"
                                alt=".."
                              />
                            </Link>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="hidden lg:flex lg:flex-col lg:items-start">
                          <div className="text-xs font-medium text-gray-900 dark:text-white">
                            {router.locale === "en"
                              ? `${item?.productEn?.enName}`
                              : `${item?.productName}`}
                          </div>
                          <div>{item.type ? item.type : null}</div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="font-medium text-sm text-end">
                            {Intl.NumberFormat().format(item.price) + "₫"}
                          </div>
                          <div className="text-xs text-red-600">
                            {item.discount ? `Đã giảm ${item.discount}%` : null}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center justify-center">
                            <button
                              className="font-medium text-3xl"
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  setItemId(item.id);
                                  setDelModal(!delModal);
                                } else
                                  updateItemQuantity(
                                    item.id,
                                    item.quantity! - 1
                                  );
                              }}
                            >
                              <HiChevronLeft />
                            </button>
                            <input
                              value={item.quantity}
                              onChange={(e: any) => {
                                if (e.target.value <= 0) {
                                  setItemId(item.id);
                                  setDelModal(!delModal);
                                } else
                                  updateItemQuantity(
                                    item.id,
                                    e.target.value * 1
                                  );
                              }}
                              className="w-7 flex text-base content-center justify-center text-center"
                            />
                            <button
                              className="font-medium text-3xl"
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity! + 1)
                              }
                            >
                              <HiChevronRight />
                            </button>

                            <Transition appear show={delModal} as={Fragment}>
                              <Dialog
                                as="div"
                                className="relative z-10"
                                onClose={() => setDelModal(!delModal)}
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
                                        <h1 className="text-center w-full mb-6">
                                          {t(
                                            "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?"
                                          )}
                                        </h1>
                                        <div className="flex gap-10 items-center justify-around">
                                          <Button
                                            color="failure"
                                            onClick={(e: any) => {
                                              setDelModal(false);
                                            }}
                                          >
                                            {t("Không")}
                                          </Button>
                                          <Button
                                            color="success"
                                            onClick={(e: any) => {
                                              updateItemQuantity(
                                                itemId,
                                                item.quantity! - 1
                                              );
                                              setDelModal(false);
                                            }}
                                          >
                                            {t("Đồng ý")}
                                          </Button>
                                        </div>
                                      </Dialog.Panel>
                                    </Transition.Child>
                                  </div>
                                </div>
                              </Dialog>
                            </Transition>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="font-medium text-end text-green-700">
                            {Intl.NumberFormat().format(item.itemTotal) + "₫"}
                            {/* <button
                              onClick={() => {
                                setItemId(item.id)
                                setDelModal(!delModal)}}
                              className="text-lg rounded-full bg-red-500 px-2 text-white"
                            >
                              &times;
                            </button> */}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>

            <div className="lg:col-start-4 lg:col-end-5 mx-2 lg:mx-0 sticky right-0 z-10">
              <div className="flex justify-between border-b border-gray-100 pb-4">
                <p className="font-medium">{t("Tạm tính:")}</p>
                <p className="font-medium">
                  {Intl.NumberFormat().format(cartTotal) + " ₫"}
                </p>
              </div>
              <div className="flex justify-between border-b border-solid border-gray-100 py-4">
                <p className="font-medium">{t("Giảm giá")}</p>
                <p className="font-medium">0 đ</p>
              </div>

              <div className="flex justify-between mt-4">
                <p className="font-medium">{t("Thành tiền:")}</p>
                <p className="font-bold text-green-600 text-xl">
                  {Intl.NumberFormat().format(cartTotal) + " ₫"}
                </p>
              </div>

              <Button
                onClick={() => router.push("/checkout")}
                className="w-full mt-6 bg-green-600 uppercase"
              >
                {t("Thanh Toán Ngay")}
              </Button>

              <Button
                onClick={() => router.push("/")}
                className="w-full mt-3 hover:bg-green-600 hover:text-white uppercase"
                color={"gray"}
              >
                {t("Tiếp tục mua hàng")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center font-medium text-lg mb-8 pt-8">
            {t("Bạn chưa chọn sản phẩm nào")}
          </div>
        )}
      </div>
    </div>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <CartProvider>
      <Layout>
        <>{page}</>
      </Layout>
    </CartProvider>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Index;
