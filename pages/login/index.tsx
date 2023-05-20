import { Breadcrumb, Button, TextInput } from "flowbite-react";
import React, { ReactElement, useState } from "react";
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

function Index() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [twoFAcode, setTwoFAcode] = useState("");
  const [user, setUser] = useState([] as any);
  const [is2faSuccess, setIs2faSuccess] = useState(false);
  const router = useRouter();

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
            localStorage.setItem("user", JSON.stringify(res?.data));
            setSuccess(true);
            setIs2faEnabled(res?.data.isTwoFactorAuthenticationEnabled)
          } else {
            setSuccess(true);
            setAccessToken(res.data.tokens.accessToken);
            setUser(res.data);
            setIs2faEnabled(res.data.isTwoFactorAuthenticationEnabled);
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
          setIs2faSuccess(true);
        });
    } catch (error: any) {
      toast(`${error?.response.data.message}. Please try again`, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
        className: "toast-message",
      });
    }
  };

  return (
    <div className="h-auto mb-10">
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Trang chủ
          <ToastContainer />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Đăng nhập tài khoản</Breadcrumb.Item>
      </Breadcrumb>

      {success === false ? (
        <div className="flex flex-col items-center mt-10 gap-2 w-full md:w-11/12 lg:w-9/12 mx-auto">
          <h1 className="text-2xl font-medium uppercase">
            Đăng nhập tài khoản
          </h1>
          <p className="text-center">
            Đăng nhập để mua hàng và sử dụng những tiện ích mới nhất từ{" "}
            <span className="font-medium">phucfresh.vn</span>
          </p>
          <div className="flex gap-4 mt-6">
            <Link href={"http://localhost:3007/auth/facebook"}>
              <img
                width="129px"
                height="37px"
                alt="facebook-login-button"
                src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
              />
            </Link>
            <Link href={"http://localhost:3007/auth/google"}>
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
                placeholder="Nhập địa chỉ Email"
                type="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mt-5">
              <p className="text-sm font-medium uppercase mb-2">Mật khẩu:</p>
              <TextInput
                className="w-full"
                placeholder="Nhập Mật khẩu"
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
              className="bg-green-600 uppercase hover:bg-green-800 w-1/2"
              onClick={handleSubmit}
            >
              Đăng nhập
            </Button>

            <Link
              className="text-sm uppercase text-green-600 font-medium mt-1"
              href={"/login/forgetpwd"}
            >
              Quên mật khẩu?
            </Link>

            <div className="flex gap-1 items-center text-sm">
              <p className="uppercase">BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ</p>
              <Link
                className="text-green-600 uppercase font-medium"
                href={"/register"}
              >
                Tại đây
              </Link>
            </div>
          </div>
        </div>
      ) : is2faEnabled === false ? (
        <section className="text-base text-center capitalize font-medium my-20">
          <h1>
            Bạn đã đăng nhập thành công, hệ thống sẽ chuyển bạn tới trang cá
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
                Bạn đã đăng nhập thành công, hệ thống sẽ chuyển bạn tới trang cá
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

export default Index;
