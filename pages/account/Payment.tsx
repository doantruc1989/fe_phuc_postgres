import { Dialog, Transition } from "@headlessui/react";
import { Button, Label, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../other/useAxiosPrivate";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useQRCode } from "next-qrcode";

const Payment = ({ payment, setPayment, paid, setPaid, orderDetail }: any) => {
  const { t } = useTranslation("");
  const axiosPrivate = useAxiosPrivate();
  const { Canvas } = useQRCode();

  const handlePay = async (e: any) => {
    e.preventDefault();

    setPaid(true);
  };

  return (
    <>
      <Transition appear show={payment || false} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setPayment(!payment);
            setPaid(false);
          }}
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <p className="text-lg uppercase text-black font-medium text-center">
                      {t("Thanh Toán đơn hàng")}
                      {` #${orderDetail.id}`}
                    </p>
                    <div className="flex items-center gap-2 justify-center mt-2">
                      <p>Số tiền:</p>
                      <p className="font-medium text-green-600">{Intl.NumberFormat().format(orderDetail.cartTotal) + " đ"}</p>
                    </div>
                  </div>

                  <>
                    <TabView className="mt-6">
                      <TabPanel header="Momo">
                        <div className="w-full flex flex-col items-center justify-center">
                          <div className="flex items-center gap-3 my-2">
                            <img src="/image/momo.png" alt="momo" />
                            <div className="flex flex-col items-start">
                              <p>DOAN TRUC</p>
                              <p>0902932***</p>
                            </div>
                          </div>

                          <Canvas
                            text={`2|99|0902932574|Doan Truc||0|0|${orderDetail.cartTotal}|Thanh toán đơn hàng #${orderDetail.id}.|transfer_myqr`}
                            options={{
                              level: "H",
                              margin: 2,
                              scale: 4,
                              width: 300,
                              color: {
                                dark: "#000000ff",
                                light: "#ffffffff",
                              },
                            }}
                          />
                          <p className="text-justify mt-3">
                            Bạn vui lòng nhập đúng số tiền cần phải thanh toán,
                            kèm theo mã đơn hàng. Chúng tôi sẽ kiểm tra và cập
                            nhật tình trạng đơn hàng sớm nhất có thể. Xin cám ơn
                          </p>
                        </div>
                      </TabPanel>
                      <TabPanel header="Domestic Bank">
                        <div className="w-full flex flex-col items-center justify-center">
                          <div className="flex items-center gap-3 my-2">
                            <img
                              className="h-16 w-fit"
                              src="/image/vietcombank.jpg"
                              alt="momo"
                            />
                            <div className="flex flex-col items-start">
                              <p>DOAN TRUC</p>
                              <p>0381000519158</p>
                            </div>
                          </div>

                          <img
                            className="w-11/12 h-fit"
                            src="/image/vcb.png"
                            alt=""
                          />
                          <p className="text-justify mt-3">
                            Bạn vui lòng nhập đúng số tiền cần phải thanh toán,
                            kèm theo mã đơn hàng. Chúng tôi sẽ kiểm tra và cập
                            nhật tình trạng đơn hàng sớm nhất có thể. Xin cám ơn
                          </p>
                        </div>
                      </TabPanel>
                      <TabPanel header="Credit Card">
                        <div className="border border-blue-600 rounded-xl p-4 w-full mx-auto">
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
                              <Label htmlFor="email2" value="Card number:" />
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
                              Demo: {t("thanh toán thành công!!!")}
                            </p>
                          </div>
                        ) : null}

                        <Button
                          className="my-3 mx-auto capitalize"
                          onClick={handlePay}
                        >
                          {t("thanh toán")}
                        </Button>
                      </TabPanel>
                    </TabView>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Payment;
