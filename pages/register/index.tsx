import {
  Breadcrumb,
  Button,
  Label,
  Select,
  TextInput,
  Tooltip,
} from "flowbite-react";
import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";
import { HiHome } from "react-icons/hi";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import axios from "../../other/axios";
import { socket } from "../../other/socketIo";
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^\s*\S+(?:\s+\S+){1}/;
const PHONE_REGEX = /^[0-9\-\+]{10,15}$/;
const ADDRESS_REGEX = /^\s*\S+(?:\s+\S+){2}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

function Index() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [address, setAdress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [pwd, setPwd] = useState("");
  const [retypePwd, setRetypePwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("");
  const [redirect, setRedirect] = useState(false);
  const [city, setCity] = useState("");
  const [provinces, setProvinces] = useState([] as any);
  const [district, setDistrict] = useState("");
  const [proDictricts, setProDictricts] = useState([] as any);
  const [ward, setWard] = useState("");
  const [proWards, setProWards] = useState([] as any);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidAddress(
      ADDRESS_REGEX.test(address) &&
        city !== "" &&
        district !== "" &&
        ward !== ""
    );
  }, [address, city, district, ward]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd) && pwd === retypePwd);
  }, [pwd, retypePwd]);

  useEffect(() => {
    setValidSubmit(
      validEmail === true &&
        validAddress === true &&
        validName === true &&
        validPhone === true &&
        validPwd === true
    );
  }, [validEmail, validAddress, validName, validPhone, validPwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post("/auth/signup", {
          email: email,
          password: pwd,
          username: name,
          address: `${city}, ${district}, ${ward}, ${address}`,
          phone: phone,
        })
        .then((res: any) => {
          setSuccess(true);
          setName("");
          setPwd("");
          setEmail("");
          setAdress("");
          setPhone("");
          const data = {
            title: `new user ${res.data.email}`,
            path: "/user",
          };
          socket.emit("msgTobe", data);
          const timer = setTimeout(() => {
            setRedirect(true);
          }, 5000);
          return () => {
            clearTimeout(timer);
            socket.disconnect();
          };
        });
    } catch (error: any) {
      if (error) {
        toast(`${error?.response.data.message}. Please try again`, {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
          className: "toast-message",
        });
      }
    }
  };

  useEffect(() => {
    try {
      axios.get("/homepage/provinces/all").then((res: any) => {
        setProvinces(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  redirect === true &&
    router.push("/login", undefined, { locale: router.locale });

  return (
    <div className="h-auto mb-16">
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en" : "/"}
          icon={HiHome}
        >
          {t("Trang chủ")}
          <ToastContainer />
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t("Đăng ký tài khoản")}</Breadcrumb.Item>
      </Breadcrumb>
      {success === false ? (
        <div className="flex flex-col items-center mt-10 gap-2 w-full md:w-11/12 lg:w-9/12 mx-auto">
          <h1 className="text-2xl font-medium uppercase">
            {t("Đăng ký tài khoản")}
          </h1>
          <p className="text-center">
            {t("Đăng ký để mua hàng và sử dụng những tiện ích mới nhất từ ")}
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
            <div className="mt-5 w-full">
              <Label className="text-sm font-medium uppercase">
                {t("Họ và Tên:")}
              </Label>
              <TextInput
                className="w-full"
                placeholder={
                  router.locale == "default"
                    ? "Nhập họ và tên"
                    : router.locale == "en"
                    ? "Fullname"
                    : "フルネーム"
                }
                type="text"
                value={name}
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mt-5 w-full">
              <Label className="text-sm font-medium uppercase">
                {t("Địa chỉ giao hàng:")}
              </Label>

              <div className="flex flex-col md:flex-row items-center md:justify-between gap-2">
                <Select
                  className="w-full"
                  id="state"
                  required={true}
                  value={city}
                  onChange={async (e: any) => {
                    setCity(e.target.value);
                    if (e.target.value !== "") {
                      try {
                        await axios
                          .get(`/homepage/provinces/${e.target.value}`)
                          .then((res: any) => {
                            setProDictricts(res.data[0]);
                          });
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }}
                >
                  <option defaultChecked value={""}>
                    {t("--- Vui lòng chọn ---")}
                  </option>
                  {provinces
                    ? provinces.map((item: any, index: any) => {
                        return (
                          <option value={item.cities} key={index}>
                            {item.cities}
                          </option>
                        );
                      })
                    : null}
                </Select>

                <Select
                  disabled={city === "" ? true : false}
                  className="w-full"
                  id="state"
                  required={true}
                  value={district}
                  onChange={async (e: any) => {
                    setDistrict(e.target.value);
                    if (e.target.value !== "") {
                      try {
                        await axios
                          .get(`/homepage/provinces/city/${e.target.value}`)
                          .then((res: any) => {
                            setProWards(res.data[0].wards);
                          });
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }}
                >
                  <option defaultChecked value={""}>
                    {t("--- Vui lòng chọn ---")}
                  </option>
                  {proDictricts
                    ? proDictricts?.district?.map((item: any, index: any) => {
                        return (
                          <option value={item.districts} key={index}>
                            {item.districts}
                          </option>
                        );
                      })
                    : null}
                </Select>

                <Select
                  disabled={district === "" ? true : false}
                  className="w-full"
                  id="state"
                  required={true}
                  value={ward}
                  onChange={async (e: any) => {
                    setWard(e.target.value);
                  }}
                >
                  <option defaultChecked value={""}>
                    {t("--- Vui lòng chọn ---")}
                  </option>
                  {proWards
                    ? proWards.map((item: any, index: any) => {
                        return (
                          <option value={item.name} key={index}>
                            {item.name}
                          </option>
                        );
                      })
                    : null}
                </Select>
              </div>

              <TextInput
                className="w-full mt-2"
                placeholder={
                  router.locale == "default"
                    ? "Địa chỉ cụ thể"
                    : router.locale == "en"
                    ? "address"
                    : "アドレス"
                }
                type="text"
                value={address}
                onChange={(e: any) => {
                  setAdress(e.target.value);
                }}
              />
            </div>

            <div className="mt-5 w-full">
              <Tooltip
                placement="right-end"
                style="dark"
                content="Số điện thoại có ít nhất 10 số và ko bao gồm chữ"
              >
                <Label className="text-sm font-medium uppercase">
                  {t("Số điện thoại:")}
                </Label>
              </Tooltip>
              <TextInput
                className="w-full"
                placeholder={
                  router.locale == "default"
                    ? "Số điện thoại"
                    : router.locale == "en"
                    ? "Phone number"
                    : "電話番号"
                }
                type="text"
                value={phone}
                onChange={(e: any) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            <div className="mt-5 w-full">
              <Label className="text-sm font-medium uppercase mb-2">
                email:
              </Label>
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

            <div className="mt-5 w-full">
              <Tooltip
                placement="right-end"
                style="dark"
                content="Mật khẩu phải có ít nhất 8 kí tự, trong đó bao gồm ít nhất 1 kí tự hoa, 1 kí tự thường, và 1 số"
              >
                <Label className="text-sm font-medium uppercase">
                  {t("Mật khẩu:")}
                </Label>
              </Tooltip>
              <TextInput
                className="w-full"
                autoComplete="new-password"
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
            <div className="mt-5 w-full">
              <Tooltip
                placement="right-end"
                style="dark"
                content="Vui lòng nhập lại chính xác mật khẩu ở trên"
              >
                <Label className="text-sm font-medium uppercase mb-2">
                  {t("Nhập lại Mật khẩu:")}
                </Label>
              </Tooltip>
              <TextInput
                className="w-full"
                placeholder={
                  router.locale == "default"
                    ? "Nhập lại mật khẩu"
                    : router.locale == "en"
                    ? "Retype password"
                    : "パスワードを再入力してください"
                }
                autoComplete="new-password"
                type="password"
                value={retypePwd}
                onChange={(e: any) => {
                  setRetypePwd(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-col items-center gap-3 w-full">
            <Button
              className="bg-green-600 uppercase hover:bg-green-800 w-1/2"
              disabled={!validSubmit}
              onClick={handleSubmit}
            >
              {t("tạo tài khoản")}
            </Button>

            <Link
              className="text-sm uppercase text-green-600 font-medium mt-1"
              href={"/login"}
            >
              {t("Đăng nhập")}
            </Link>
          </div>
        </div>
      ) : (
        <section className="text-base text-center capitalize font-medium mt-20">
          <h1>
            {t(
              "Bạn đã đăng ký thành công, hệ thống sẽ chuyển bạn tới trang đăng nhập sau 5 giây nữa. Hoặc "
            )}
          </h1>
          <p className="mt-6">
            {t("Bấm vào")}
            <Link className="text-green-600 underline" href="/login">
              {t(" đây ")}
            </Link>
            {t("để tới trang đăng nhập")}
          </p>
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
