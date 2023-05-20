import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("react-use-cart");
    setIsSuccess(!isSuccess);
    const timer = setTimeout(() => {
      router.push("/account");
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isSuccess && (
        <section className="text-base text-center capitalize font-medium my-20">
          <h1>
            Bạn đã đặt hàng thành công, hệ thống sẽ chuyển bạn tới trang cá
            nhân của bạn sau 5 giây nữa. Hoặc{" "}
          </h1>
          <p className="mt-6">
            Bấm vào
            <Link className="text-green-600 underline" href="/">
              {" đây "}
            </Link>
            để tới trang chủ ngay lập tức
          </p>
        </section>
      )}
    </>
  );
}

export default Index;
