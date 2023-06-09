import { Dialog, Transition } from "@headlessui/react";
import { Button, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios, { axiosDefault } from "../../other/axios";
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;

function LoginModal({ isLogin, setIsLogin }: any) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const { t } = useTranslation("");
  const [ip, setIp] = useState([] as any);
  const router = useRouter();

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);
  
  useEffect(() => {
    setValidSubmit(validEmail === true && validPwd === true);
  }, [validEmail, validPwd]);

  useEffect(() => {
    try {
      axiosDefault.get("https://freeipapi.com/api/json").then((res: any) => {
        setIp(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [validEmail]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post("/auth/signin", {
          email,
          password: pwd,
          ip: JSON.stringify(ip),
        })
        .then((res: any) => {
          localStorage.setItem("user", JSON.stringify(res?.data));
          setSuccess(true);
        });
    } catch (err: any) {
      if (err) {
        toast(`${err?.response.data.message}. Please try again`, {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
          className: "toast-message",
        });
      }
    }
  };
  return (
    <Transition appear show={isLogin || false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsLogin(!isLogin)}
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
                <div className="h-auto mb-10">
                  {success === false ? (
                    <div className="flex flex-col items-center mt-10 gap-2 w-full md:w-11/12 lg:w-9/12 mx-auto">
                      <h1 className="text-2xl font-medium uppercase">
                        {t("Đăng nhập tài khoản")}
                      </h1>
                      <p className="text-center">
                        {t(
                          "Đăng nhập để mua hàng và sử dụng những tiện ích mới nhất từ "
                        )}
                        <span className="font-medium">phucfresh.vn</span>
                      </p>
                      <div className="flex gap-4 mt-6">
                        <Link
                          href={
                            "https://phucpsql.webproject.click/auth/facebook"
                          }
                        >
                          <img
                            width="129px"
                            height="37px"
                            alt="facebook-login-button"
                            src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                          />
                        </Link>
                        <Link
                          href={"https://phucpsql.webproject.click/auth/google"}
                        >
                          <img
                            width="129px"
                            height="37px"
                            alt="google-login-button"
                            src="//bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                          />
                        </Link>
                      </div>

                      <div className="w-9/12">
                        <div className="mt-5">
                          <p className="text-sm font-medium uppercase mb-2">
                            email:
                          </p>
                          <TextInput
                            className="w-full"
                            placeholder={
                              router.locale == "default"
                                ? "Email"
                                : router.locale == "en"
                                ? "Email"
                                : "メール"
                            }
                            type="email"
                            value={email}
                            onChange={(e: any) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mt-5">
                          <p className="text-sm font-medium uppercase mb-2">
                            {t("Mật khẩu:")}
                          </p>
                          <TextInput
                            className="w-full"
                            placeholder={
                              router.locale == "default"
                                ? "Mật khẩu"
                                : router.locale == "en"
                                ? "password"
                                : "パスワード"
                            }
                            type="password"
                            value={pwd}
                            onChange={(e: any) => {
                              setPwd(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col items-center gap-3 w-full">
                        <Button
                          disabled={!validSubmit}
                          className="bg-green-600 uppercase hover:bg-green-800 w-1/2"
                          onClick={handleSubmit}
                        >
                          {t("Đăng nhập")}
                        </Button>

                        <Link
                          className="text-sm uppercase text-green-600 font-medium mt-1"
                          href={"/login/forgetpwd"}
                        >
                          {t("Quên mật khẩu?")}
                        </Link>

                        <div className="flex gap-1 items-center text-sm">
                          <p className="uppercase">
                            {t("BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ")}
                          </p>
                          <Link
                            className="text-green-600 uppercase font-medium"
                            href={"/register"}
                          >
                            {t("Tại đây")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <section className="text-base text-center capitalize font-medium my-20">
                      <h1>{t("Bạn đã đăng nhập thành công")}</h1>
                    </section>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default LoginModal;
