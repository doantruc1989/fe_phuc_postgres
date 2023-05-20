import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../other/useAxiosPrivate";

function Index() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  useEffect(() => {
    const axios = async () => {
      try {
        axiosPrivate.get("/auth/logout").then(() => {
          localStorage.removeItem("user");
          const timer = setTimeout(() => {
            router.push("/");
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    axios();
    return () => {
      controller.abort();
    };
  }, []);

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
    </div>
  );
}

export default Index;
