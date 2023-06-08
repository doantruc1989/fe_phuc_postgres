import { Breadcrumb, Button, Spinner, TextInput } from "flowbite-react";
import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import axios from "../../other/axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;

function Index() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [twoFAcode, setTwoFAcode] = useState("");
  const [user, setUser] = useState([] as any);
  const [is2faSuccess, setIs2faSuccess] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("");

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);
  useEffect(() => {
    setValidSubmit(validEmail === true && validPwd === true);
  }, [validEmail, validPwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post("/auth/signin", {
          email,
          password: pwd,
        })
        .then((res: any) => {
          if (!res.data.isTwoFactorAuthenticationEnabled) {
            setEmail("");
            setPwd("");
            localStorage.setItem("user", JSON.stringify(res?.data));
            setSuccess(true);
            setIs2faEnabled(res?.data.isTwoFactorAuthenticationEnabled);
            const timer = setTimeout(() => {
              setRedirect(true);
            }, 5000);
            return () => {
              clearTimeout(timer);
            };
          } else {
            setSuccess(true);
            setAccessToken(res.data.tokens.accessToken);
            setUser(res.data);
            setIs2faEnabled(res.data.isTwoFactorAuthenticationEnabled);
            setEmail("");
            setPwd("");
          }
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

  const handle2Fa = async (e: any) => {
    // e.preventDefault();
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      await axios
        .post("/2fa/authenticate", {
          twoFactorAuthenticationCode: twoFAcode,
          id: user.id,
        })
        .then((res: any) => {
          localStorage.setItem("user", JSON.stringify(res?.data));
          setEmail("");
          setPwd("");
          setIs2faSuccess(true);
          const timer = setTimeout(() => {
            setRedirect(true);
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        });
    } catch (error: any) {
      toast(`${error?.response.data.message}. Please try again`, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
        className: "toast-message",
      });
    }
  };
  redirect === true &&
    router.push("/account", undefined, {
      locale: router.locale,
      shallow: true,
    });

  return (
    <div className="h-auto mb-10">
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en" : "/"}
          icon={HiHome}
        >
          {t("Trang chủ")}
          <ToastContainer />
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t("Đăng nhập tài khoản")}</Breadcrumb.Item>
      </Breadcrumb>
      {success === false ? (
        <div className="flex flex-col items-center mt-10 gap-2 w-full md:w-11/12 lg:w-9/12 mx-auto">
          <h1 className="text-2xl font-medium uppercase">
            {t("Đăng nhập tài khoản")}
          </h1>
          <p className="text-center">
            {t("Đăng nhập để mua hàng và sử dụng những tiện ích mới nhất từ ")}
            <span className="font-medium">phucfresh.vn</span>
          </p>
          <div className="flex gap-4 mt-6">
            <Link href={"https://phucpsql.webproject.click/auth/facebook"}>
              <img
                width="129px"
                height="37px"
                alt="facebook-login-button"
                src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
              />
            </Link>
            <Link href={"https://phucpsql.webproject.click/auth/google"}>
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
              <p className="text-sm font-medium uppercase mb-2">email:</p>
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
              <p className="uppercase">{t("BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ")}</p>
              <Link
                className="text-green-600 uppercase font-medium"
                href={"/register"}
              >
                {t("Tại đây")}
              </Link>
            </div>
          </div>
        </div>
      ) : is2faEnabled === false ? (
        <section className="text-base text-center capitalize font-medium my-20">
          <h1>
            {t(
              "Bạn đã đăng nhập thành công, hệ thống sẽ chuyển bạn tới trang cá nhân của bạn sau 5 giây nữa. Hoặc "
            )}
          </h1>
          <p className="mt-6">
            {t("Bấm vào")}
            <Link className="text-green-600 underline" href="/">
              {t(" đây ")}
            </Link>
            {t("để tới trang chủ ngay lập tức")}
          </p>
          <Spinner className="mt-6" color="success" />
        </section>
      ) : (
        <div className="w-9/12 mx-auto">
          {!is2faSuccess ? (
            <div className="mt-5 flex gap-2 items-center justify-center">
              <p className="text-sm font-medium uppercase">2FA:</p>
              <TextInput
                className="w-1/2"
                placeholder="Nhập code"
                type="text"
                value={twoFAcode}
                onChange={(e: any) => {
                  setTwoFAcode(e.target.value);
                }}
              />
              <Button
                className="bg-green-600 uppercase hover:bg-green-800 w-fit"
                onClick={handle2Fa}
              >
                OK
              </Button>
            </div>
          ) : (
            <section className="text-base text-center capitalize font-medium my-20">
              <h1>
                {t(
                  "Bạn đã đăng nhập thành công, hệ thống sẽ chuyển bạn tới trang cá nhân của bạn sau 5 giây nữa. Hoặc "
                )}
              </h1>
              <p className="mt-6">
                {t("Bấm vào")}
                <Link className="text-green-600 underline" href="/">
                  {t(" đây ")}
                </Link>
                {t("để tới trang chủ ngay lập tức")}
              </p>
              <Spinner className="mt-6" color="success" />
            </section>
          )}
        </div>
      )}
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
