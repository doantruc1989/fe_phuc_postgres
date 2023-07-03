import { Breadcrumb, Button, Spinner, TextInput } from "flowbite-react";
import React, { ReactElement, useState } from "react";
import { CartProvider } from "react-use-cart";
import Layout from "../../components/Layout";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "../../../other/axios";

function Index() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post("/mailing/forgot-password", {
          email,
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

  redirect === true &&
    router.push("/", undefined, {
      locale: router.locale,
      shallow: true,
    });

  return (
    <div className="h-auto mb-10">
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item href={router.locale === "en" ? "/en" : "/"} icon={HiHome}>
        {t("Trang chủ")}
          <ToastContainer />
        </Breadcrumb.Item>
        <Breadcrumb.Item
  
        >
          {t("Quên mật khẩu")}
        </Breadcrumb.Item>
      </Breadcrumb>
      {success === false ? (
        <div className="flex flex-col items-center mt-10 gap-2 w-full md:w-11/12 lg:w-9/12 mx-auto">
          <h1 className="text-2xl font-medium uppercase">{t("ĐẶT LẠI MẬT KHẨU")}</h1>
          <p className="text-center">
            {t("Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.")}
          </p>

          <div className="w-9/12">
            <div className="mt-5">
              <p className="text-sm font-medium uppercase mb-2">email:</p>
              <TextInput
                className="w-full"
                placeholder={router.locale == 'default' ? "Email của bạn" : router.locale == 'en' ? "Your Email" : "あなたのメールアドレス"}
                type="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-col items-center gap-3 w-full">
            <Button
              className="bg-green-600 uppercase hover:bg-green-800 w-1/2"
              onClick={handleSubmit}
            >
              {t("Lấy lại mật khẩu")}
            </Button>

            <div className="flex gap-1 items-center text-sm">
              <p className="uppercase">{t("quay lại")}</p>
              <Link
                className="text-green-600 uppercase font-medium"
                href={"/login"}
              >
                {t("Tại đây")}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <section className="text-base text-center capitalize font-medium my-20">
          <h1>
            {t("Chúng tôi đã gửi email xác nhận cho bạn, vui lòng kiểm tra email và làm theo hướng dẫn")}
          </h1>
          <p>
            {t("hệ thống sẽ chuyển bạn tới trang chủ trong vòng 5 giây nữa hoặc ")}
          </p>
          <p className="mt-6">
            {t("Bấm vào")}
            <Link className="text-green-600 underline" href="/login">
              {t(" đây ")}
            </Link>
            {t("để tới trang chủ ngay lập tức")}
          </p>
          <Spinner className="mt-6" color="success" />
        </section>
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
