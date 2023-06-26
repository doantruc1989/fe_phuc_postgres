import { Dialog, Transition } from "@headlessui/react";
import {
  Breadcrumb,
  Button,
  Label,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
  Tooltip,
} from "flowbite-react";
import Link from "next/link";
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { HiHome, HiEye, HiEyeOff } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { TabPanel, TabView } from "primereact/tabview";
import OrdersTab from "./OrdersTab";
import useAxiosPrivate from "../../other/useAxiosPrivate";
import axios from "../../other/axios";
import { useQRCode } from "next-qrcode";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
const PHONE_REGEX = /^[0-9\-\+]{10,15}$/;
const AVT_REGEX = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
const ADDRESS_REGEX = /^\s*\S+(?:\s+\S+){2}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

function Index() {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [users, setUsers] = useState([] as any);
  const [userPw, setUserPw] = useState("");
  const [userPw2, setUserPw2] = useState("");
  const [validPw, setValidPw] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [validUrl, setValidUrl] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orders, setOrders] = useState([] as any);
  const [paid, setPaid] = useState(false);
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [status2Fa, setStatus2Fa] = useState(false);
  const [qrCode, setQrCode] = useState(" ");
  const { Canvas } = useQRCode();
  const router = useRouter();
  const { t } = useTranslation("");
  const [city, setCity] = useState("");
  const [provinces, setProvinces] = useState([] as any);
  const [district, setDistrict] = useState("");
  const [proDictricts, setProDictricts] = useState([] as any);
  const [ward, setWard] = useState("");
  const [proWards, setProWards] = useState([] as any);

  useEffect(() => {
    setValidPw(PWD_REGEX.test(userPw) && userPw === userPw2 && userPw !== "");
  }, [userPw, userPw2]);

  useEffect(() => {
    setValidAddress(
      ADDRESS_REGEX.test(address) &&
        city !== "" &&
        district !== "" &&
        ward !== ""
    );
  }, [address, city, district, ward]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidUrl(AVT_REGEX.test(avatar));
  }, [avatar]);

  useEffect(() => {
    try {
      axios.get("/homepage/provinces/all").then((res: any) => {
        setProvinces(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const user =
    typeof Storage === "undefined"
      ? {}
      : JSON.parse(localStorage.getItem("user") || "{}");

  // useEffect(() => {
  //   router.events.on("routeChangeComplete", () => {
  //     router.reload();
  //   });
  //   if (!user.isEmailConfirmed) {
  //     try {
  //       axios.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${user.tokens.refreshToken}`;
  //       axios.get("/auth/verifyagain").then((res: any) => {
  //         console.log(res.data);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const getUsers = async () => {
      axiosPrivate.get(`/users/${user.id}`).then((res) => {
        setUsers(res?.data);
        setUserPhone(res?.data?.phone);
        setIs2faEnabled(res?.data.isTwoFactorAuthenticationEnabled);
      });
    };
    getUsers();

    return () => {
      controller.abort();
    };
  }, [isSuccess]);

  useEffect(() => {
    const getUsers = async () => {
      axiosPrivate.get(`/cart/order/${user.id}`).then((res) => {
        setOrders(res.data);
      });
    };
    getUsers();

    return () => {
      controller.abort();
    };
  }, [paid]);

  const handleChangeAvt = () => {
    const getUsers = async () => {
      try {
        axiosPrivate
          .put(`/users/${users.id}`, {
            image: avatar || users.image,
          })
          .then((res: any) => {
            const newUser = { ...user, image: res.data.image };
            localStorage.setItem("user", JSON.stringify(newUser));
            setIsSuccess(!isSuccess);
            if (res.data) {
              toast("Update user avatar successfully", {
                position: toast.POSITION.TOP_RIGHT,
                type: toast.TYPE.SUCCESS,
                className: "toast-message",
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  };

  const handleChangeAddress = () => {
    try {
      axiosPrivate
        .put(`/users/${users.id}`, {
          address: `${city}, ${district}, ${ward}, ${address}` || users.address,
          phone: phone || users.phone,
        })
        .then((res: any) => {
          setIsSuccess(!isSuccess);
          const newUser = {
            ...user,
            address: `${city}, ${district}, ${ward}, ${address}` || users.address,
            phone: res?.data.phone || users.phone,
          };
          localStorage.setItem("user", JSON.stringify(newUser));
          if (res.data) {
            toast("Update user address successfully", {
              position: toast.POSITION.TOP_RIGHT,
              type: toast.TYPE.SUCCESS,
              className: "toast-message",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePw = () => {
    try {
      axiosPrivate
        .put(`/users/profile/${users.id}`, {
          password: userPw,
        })
        .then((res: any) => {
          if (res.data) {
            toast("Update user password successfully", {
              position: toast.POSITION.TOP_RIGHT,
              type: toast.TYPE.SUCCESS,
              className: "toast-message",
            });
          }
        });
    } catch (error: any) {
      toast(
        `${error?.response.data.message.map((err: any) => {
          err;
        })}. please try again`,
        {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
          className: "toast-message",
        }
      );
    }
  };

  const handleChange2Fa = () => {
    const getUsers = async () => {
      try {
        axiosPrivate.get(`/2fa/generate/${user.email}`).then((res: any) => {
          setQrCode(res?.data);
          setIsSuccess(!isSuccess);
          if (res.data) {
            toast("Enable 2FA successfully", {
              position: toast.POSITION.TOP_RIGHT,
              type: toast.TYPE.SUCCESS,
              className: "toast-message",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  };

  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en" : "/"}
          icon={HiHome}
        >
          {t("Trang chủ")}
          <ToastContainer />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {t("Trang cá nhân của ")}
          {users.username}
        </Breadcrumb.Item>
      </Breadcrumb>
      {users?.email === undefined ? (
        <div className="w-full text-center my-20 uppercase">
          <p className="mt-3">
            u have not permission to be here. A new email is recently sent,
            please verify your email first.
          </p>
          <p className="my-3">Then login again. thank you</p>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-3 gap-5">
          <div className="col-end-0 w-full bg-white rounded-xl pt-2 mb-6">
            <img
              src={users.image}
              alt={users.username}
              className=" w-8/12 md:w-10/12 mx-auto mb-6 mt-3 rounded-lg"
            />
            <div className="flex flex-col items-center text-center mb-3">
              <h1 className="font-medium">{t("Email:")}</h1>
              <p>{users.email}</p>
            </div>
            <div className="flex flex-col items-center text-center mb-3">
              <h1 className="font-medium">{t("Họ và tên:")}</h1>
              <p>{users.username}</p>
            </div>
            <div className="flex flex-col items-center text-center mb-3">
              <h1 className="font-medium">{t("Địa chỉ:")}</h1>
              <p>{users.address}</p>
            </div>
            <div className="flex flex-col items-center text-center mb-3">
              <h1 className="font-medium">{t("Số điện thoại:")}</h1>
              {isHidden === false ? (
                <div className="flex items-center gap-3 justify-center">
                  <p>{userPhone}</p>
                  <Link
                    className="text-green-600"
                    href={"#"}
                    onClick={(e: any) => {
                      e.preventDefault();
                      setIsHidden(true);
                    }}
                  >
                    <HiEyeOff />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3 justify-center">
                  <p>**********</p>
                  <Link
                    className="text-green-600"
                    href={"#"}
                    onClick={(e: any) => {
                      e.preventDefault();
                      setIsHidden(false);
                    }}
                  >
                    <HiEye />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="col-start-2 col-end-4 w-full bg-white text-xs rounded-xl pt-2  mb-6">
            <TabView>
              <TabPanel header={t("Đơn hàng")}>
                <OrdersTab orders={orders} paid={paid} setPaid={setPaid} />
              </TabPanel>
              <TabPanel header={t("Đổi mật khẩu")}>
                <div className="flex flex-col justify-center w-9/12 mx-auto">
                  <h1 className="text-center my-6 font-medium uppercase">
                    {t("Đổi mật khẩu")}
                  </h1>
                  <TextInput
                    color={validPw === true ? "success" : "gray"}
                    value={userPw}
                    placeholder={
                      router.locale == "default"
                        ? "Mật khẩu mới"
                        : router.locale == "en"
                        ? "New password"
                        : "新しいパスワード"
                    }
                    onChange={(e) => setUserPw(e.target.value)}
                    type="password"
                    className="mb-3"
                  />

                  <TextInput
                    color={validPw === true ? "success" : "gray"}
                    value={userPw2}
                    placeholder={
                      router.locale == "default"
                        ? "Nhập lại mật khẩu"
                        : router.locale == "en"
                        ? "Retype password"
                        : "パスワードを再入力してください"
                    }
                    onChange={(e) => setUserPw2(e.target.value)}
                    type="password"
                    helperText={
                      validPw === false ? (
                        <p className="text-xs text-end w-full text-red-500">
                          {t(
                            "Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 8 kí tự, trong đó bao gồm ít nhất 1 kí tự hoa, 1 kí tự thường, và 1 số"
                          )}
                        </p>
                      ) : null
                    }
                  />
                  <div className="flex items-center justify-center mt-3">
                    <Button
                      color="success"
                      disabled={!validPw}
                      onClick={handleChangePw}
                    >
                      OK
                    </Button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header={t("Đổi địa chỉ")}>
                <div className="flex flex-col justify-center w-9/12 mx-auto">
                  <h1 className="text-center my-6 font-medium uppercase">
                    {t("Đổi địa chỉ")}
                  </h1>
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
                        ? proDictricts?.district?.map(
                            (item: any, index: any) => {
                              return (
                                <option value={item.districts} key={index}>
                                  {item.districts}
                                </option>
                              );
                            }
                          )
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
                    className="mt-2"
                    type="text"
                    value={address}
                    color={validAddress === true ? "success" : "gray"}
                    placeholder={
                      router.locale == "default"
                        ? "địa chỉ giao hàng mới"
                        : router.locale == "en"
                        ? "New address"
                        : "新しいアドレス"
                    }
                    onChange={(e: any) => setAddress(e.target.value)}
                    helperText={
                      validAddress === false ? (
                        <React.Fragment>
                          <p className="text-xs text-end w-full text-red-500">
                            {t("Địa chỉ không hợp lệ")}
                          </p>
                        </React.Fragment>
                      ) : null
                    }
                  />
                  <TextInput
                    className="mt-2"
                    type="text"
                    value={phone}
                    color={validPhone === true ? "success" : "gray"}
                    placeholder={
                      router.locale == "default"
                        ? "Số điện thoại mới"
                        : router.locale == "en"
                        ? "New phone number"
                        : "新しい電話番号"
                    }
                    onChange={(e: any) => setPhone(e.target.value)}
                    helperText={
                      validPhone === false ? (
                        <React.Fragment>
                          <p className="text-xs text-end w-full text-red-500">
                            {t("Số điện thoại không hợp lệ")}
                          </p>
                        </React.Fragment>
                      ) : null
                    }
                  />
                  <div className="flex items-center justify-center mt-3">
                    <Button
                      color="success"
                      disabled={!validAddress && !validPhone}
                      className="w-fit"
                      onClick={handleChangeAddress}
                    >
                      OK
                    </Button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header={t("Đổi avatar")}>
                <div className="flex flex-col justify-center w-9/12 mx-auto">
                  <h1 className="text-center my-6 font-medium uppercase">
                    {t("Đổi avatar")}
                  </h1>
                  <TextInput
                    color={validUrl === true ? "success" : "gray"}
                    type="text"
                    value={avatar}
                    placeholder={
                      router.locale == "default"
                        ? "url hình ảnh avt https://...."
                        : router.locale == "en"
                        ? "URL image"
                        : "URL画像"
                    }
                    onChange={(e: any) => setAvatar(e.target.value)}
                    helperText={
                      validUrl === false ? (
                        <React.Fragment>
                          <p className="text-xs text-end w-full text-red-500">
                            {t(
                              "URL avatar không hợp lệ. URL phải có đuôi là jpg jpeg png webp avif gif svg"
                            )}
                          </p>
                        </React.Fragment>
                      ) : null
                    }
                  />
                  <div className="flex items-center justify-center mt-3">
                    <Button
                      color="success"
                      disabled={avatar === "" ? true : false}
                      onClick={handleChangeAvt}
                    >
                      OK
                    </Button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel header="2FA">
                <div className="flex flex-col items-center justify-center w-9/12 mx-auto">
                  <h1 className="text-center my-6 font-medium uppercase">
                    {t("Xác thực 2 yếu tố")}
                  </h1>
                  {!is2faEnabled ? (
                    <>
                      <ToggleSwitch
                        checked={status2Fa}
                        label="2FA"
                        onChange={() => setStatus2Fa(!status2Fa)}
                      />
                      <div className="flex items-center justify-center mt-6">
                        <Button
                          color="success"
                          disabled={!status2Fa ? true : false}
                          onClick={handleChange2Fa}
                        >
                          OK
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="mt-6">
                      <p className="text-center">
                        {t("Xác thực 2 yếu tố đã được bật")}
                      </p>
                      <p className="text-center my-3">
                        {t(
                          "Vui lòng kiểm tra email trong trương hợp bạn quên mã bí mật này"
                        )}
                      </p>
                      {qrCode === " " ? (
                        ""
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Canvas
                            text={qrCode}
                            options={{
                              level: "H",
                              margin: 2,
                              scale: 4,
                              width: 300,
                              color: {
                                dark: "#000000ff",
                                light: "#ffffffff",
                              },
                            }}
                          />
                          <p className="text-center">
                            {t("Vui lòng ghi nhớ mã bí mật này")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabPanel>
            </TabView>
          </div>
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
