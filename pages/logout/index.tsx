import axios from "axios";
import { Spinner } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../other/useAxiosPrivate";

function Index() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const axios = async () => {
      try {
        axiosPrivate.get("/auth/logout").then(() => {
          localStorage.removeItem("user");
          const timer = setTimeout(() => {
            setRedirect(true);
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        });
      } catch (error) {
        if (error) {
          localStorage.removeItem("user");
          console.log(error);
        }
      }
    };
    axios();

    return () => {
      controller.abort();
    };
  }, []);

  redirect === true && router.push("/", undefined, { locale: router.locale });

  return (
    <div className="text-base text-center capitalize font-medium my-20">
      <p className="text-md capitalize">bạn đă đăng xuất thành công.</p>
      <p> hệ thống sẽ chuyển bạn tới trang chủ trong vòng 5 giây nữa hoặc</p>
      <p className="mt-6">
        Bấm vào
        <Link className="text-green-600 underline" href="/">
          {" đây "}
        </Link>
        để tới trang chủ ngay lập tức
      </p>
      <Spinner className="mt-6" color="success" />
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

export default Index;
