import { Breadcrumb, Button, Spinner, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "react-use-cart";
import { axiosDefault } from "../../../other/axios";
import Layout from "../../components/Layout";
import { BASE_URL } from "../../../other/axios";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Token = () => {
  const router = useRouter();
  const token = router.query.token;
  const { t } = useTranslation("");
  const [password, setPassword] = useState("");
  const [reTypePw, setReTypePw] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password) && password === reTypePw);
  }, [password, reTypePw]);

  const handleSubmit = async () => {
    axiosDefault.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await axiosDefault
        .put(`${BASE_URL}/users/forgot-pw`, {
          password: password,
        })
        .then((res: any) => {
          setSuccess(true);
          const timer = setTimeout(() => {
            setRedirect(true);
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        });
    } catch (error: any) {
      if (error) {
        toast(`${error?.response?.data?.message}. Please try again`, {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
          className: "toast-message",
        });
      }
    }
  };

  redirect === true &&
    router.push("/", undefined, {
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
        <Breadcrumb.Item>{t("Đặt lại mật khẩu")}</Breadcrumb.Item>
      </Breadcrumb>

      {success === false ? (
        <div className="flex flex-col items-center mt-10 gap-2 w-full md:w-11/12 lg:w-9/12 mx-auto">
          <h1 className="text-2xl font-medium uppercase">
            {t("ĐẶT LẠI MẬT KHẨU")}
          </h1>
          <div className="w-9/12">
            <div className="mt-5">
              <p className="text-sm font-medium uppercase mb-2">
                New password:
              </p>
              <TextInput
                className="w-full"
                placeholder={
                  router.locale == "default"
                    ? "Mật khẩu mới"
                    : router.locale == "en"
                    ? "Your new password"
                    : "あなたのパスワード"
                }
                type="password"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mt-5">
              <p className="text-sm font-medium uppercase mb-2">
                New retype password:
              </p>
              <TextInput
                className="w-full"
                placeholder={
                  router.locale == "default"
                    ? "Nhập lại mật khẩu mới"
                    : router.locale == "en"
                    ? "Your retype new password"
                    : "あなたの再入力パスワード"
                }
                type="password"
                value={reTypePw}
                onChange={(e: any) => {
                  setReTypePw(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-col items-center gap-3 w-full">
            <Button
              disabled={!validPwd}
              className="bg-green-600 uppercase hover:bg-green-800 w-1/2"
              onClick={handleSubmit}
            >
              {t("OK")}
            </Button>
          </div>
        </div>
      ) : (
        <section className="text-base text-center capitalize font-medium my-20">
          <h1>
            {t(
              "Bạn đã đổi mật khẩu mới thành công, hệ thống sẽ chuyển bạn tới trang chủ sau 5 giây nữa. Hoặc "
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
  );
};
Token.getLayout = function getLayout(page: ReactElement) {
  return (
    <CartProvider>
      <Layout>
        <>{page}</>
      </Layout>
    </CartProvider>
  );
};
export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Token;
