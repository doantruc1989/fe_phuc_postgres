
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [user, setUser] = useState([] as any);

  const router = useRouter();
console.log(user);
  useEffect(() => {
    try {
      axios.get(`http://localhost:3007${router.asPath}`).then((res: any) => {
        setUser(res.data);
        
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
        const timer = setTimeout(() => {
          router.push("/account");
        }, 5000);
  },[user])

  return (
    <section className="text-base text-center capitalize font-medium my-20">
      <h1>
        Bạn đã đăng nhập thành công, hệ thống sẽ chuyển bạn tới trang cá nhân
        của bạn sau 5 giây nữa.
      </h1>
      <p>Bạn vui lòng cập nhật mật khẩu mới</p>
      <p className="mt-6">
      Hoặc bấm vào
        <Link className="text-green-600 underline" href="/account">
          {" đây "}
        </Link>
        để tới trang cá nhân của bạn ngay lập tức
      </p>
    </section>
  );
}

export default Index;
