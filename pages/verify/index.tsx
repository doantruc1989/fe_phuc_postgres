import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import axios from "../../other/axios";
import Layout from "../components/Layout";

const Index = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const token = router.query?.token;

  const user =
    typeof Storage === "undefined"
      ? {}
      : JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get("/auth/verify").then((res: any) => {
        if (res.data || user.id !== undefined) {
          const newUser = { ...user, isEmailConfirmed: true };
          localStorage.setItem("user", JSON.stringify(newUser));
        }
        setIsSuccess(true);
        const timer = setTimeout(() => {
          setRedirect(true);
        }, 5000);
        return () => {
          clearTimeout(timer);
        };
      });
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  redirect === true &&
    router.push("/", undefined, {
      locale: router.locale,
      shallow: true,
    });

  return (
    <div className="text-center w-full my-20">
      {isSuccess ? (
        <div>
          <p className="my-2">Verify email thành công</p>
          <p>Hệ thống sẽ chuyển bạn tới trang chủ sau 5 giây nữa</p>

          {user?.id !== undefined ? null : (
            <div>
              click
              <Link href={"/login"} className="text-blue-500 underline">
                {" "}
                here
              </Link>{" "}
              to Login
            </div>
          )}
        </div>
      ) : (
        <div>Verify email fail</div>
      )}
    </div>
  );
};

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
