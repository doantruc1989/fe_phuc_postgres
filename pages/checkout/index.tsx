
import { Button, Label, Select, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiUserCircle, HiOutlineChevronLeft } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider, useCart } from "react-use-cart";
import axios from "../../other/axios";
import useAxiosPrivate from "../../other/useAxiosPrivate";
import LoginModal from "./LoginModal";
import SecurityModal from "./SecurityModal";
import TcModal from "./TcModal";
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^\s*\S+(?:\s+\S+){1}/;
const PHONE_REGEX = /^[0-9\-\+]{9,15}$/;
const ADDRESS_REGEX = /^\s*\S+(?:\s+\S+){2}/;

function Index() {
  const [users, setUsers] = useState([] as any);
  const [fee, setFee] = useState(35000);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { totalItems, items, cartTotal } = useCart();
  const [total, setTotal] = useState(cartTotal);
  const [secutityModal, setSecurityModal] = useState(false);
  const [tcModal, setTcModal] = useState(false);
  const [city, setCity] = useState("");
  const [provinces, setProvinces] = useState([] as any);
  const [district, setDistrict] = useState("");
  const [proDictricts, setProDictricts] = useState([] as any);
  const [ward, setWard] = useState("");
  const [proWards, setProWards] = useState([] as any);
  const [isDisable, setIsDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [address, setAdress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("");

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
    setValidAddress(ADDRESS_REGEX.test(address));
  }, [address]);

  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const user =
      typeof Storage === "undefined"
        ? {}
        : JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    setIsDisable(
      validEmail === true &&
        validName === true &&
        validPhone === true &&
        validAddress === true &&
        ward !== ""
    );
  }, [email, name, phone, address, ward, users]);

  useEffect(() => {
    setIsUpdate(validPhone === true || (ward !== "" && address !== ""));
  }, [phone, address]);

  useEffect(() => {
    const axios = async () => {
      axiosPrivate.get(`/users/${user.id}`).then((res) => {
        setUsers(res?.data);
      });
    };
  
    if(user.tokens){
      axios();
    }
    return 

  }, [isChange, isLogin]);

  useEffect(() => {
    try {
      axios
        .get("/homepage/provinces/all")
        .then((res: any) => {
          setProvinces(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setTotal(cartTotal + fee);
  }, [fee]);

  const handleUpdateAdd = () => {
    const axios = async () => {
      try {
        axiosPrivate
          .put(`/users/${users.id}`, {
            address:
              address !== ""
                ? address + ", " + ward + ", " + district + ", " + city
                : users.address,
            phone: phone !== "" ? phone : users.phone,
          })
          .then((res: any) => {
            setIsChange(false);
            setPhone("");
            setAdress("");
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
    axios();

    return () => {
      controller.abort();
    };
    
  };

  const handlePay = () => {
    try {
      axios
        .post("/cart/order", {
          address:
            users?.address ||
            address + ", " + ward + ", " + district + ", " + city,
          phone: users?.phone || phone,
          trans: fee,
          cartTotal: total,
          user: users.id || null,
          orderItems: JSON.stringify(items),
          isPaid: paymentMethod,
          guest: users?.id === undefined ? email + " " + name : null,
        })
        .then((res: any) => {
          console.log(res.data);
          router.push("/checkout/finish");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-start-1 lg:col-end-3">
          <div className="border-b border-gray-300 pb-20 lg:pb-[200px]">
            <div className="flex items-center justify-center mt-8">
              <Link href={"/"}>
                <img
                  className="w-20 h-20 rounded-full"
                  src="/image/logo.png"
                  alt=""
                />
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold">{t("Thông tin mua hàng")}</h1>
                  <ToastContainer />
                  {users?.email !== undefined ? null : (
                    <Link
                      className="flex gap-1 items-center text-green-500"
                      href={"#"}
                      onClick={(e: any) => {
                        e.preventDefault();
                        setIsLogin(!isLogin);
                      }}
                    >
                      <HiUserCircle className="text-2xl" />
                      <p>{t("Đăng nhập")}</p>
                    </Link>
                  )}
                </div>
                {users?.email !== undefined ? (
                  <div className="p-2 bg-white rounded-lg flex flex-col gap-2">
                    <div className="flex justify-between gap-2 font-medium">
                      <h1 className="underline">{t("Giao tới:")}</h1>
                      <Link
                        href="#"
                        className="text-green-600 cursor-pointer text-xs"
                        onClick={(e: any) => {
                          e.preventDefault();
                          setIsChange(!isChange);
                        }}
                      >
                        {t("thay đổi")}
                      </Link>
                    </div>
                    <div className="border rounded-md py-2 border-green-600">
                      <div className="flex gap-2 ml-4">
                        <span className="font-medium">{users.username}</span>
                        <span>{users.phone}</span>
                      </div>
                      <p className="text-sm ml-4">{users.address}</p>
                    </div>
                    {isChange ? (
                      <div className="mt-3">
                        <div className="flex items-center pl-2 mt-2 ">
                          <Label className="w-1/3">{t("Số điện thoại:")}</Label>
                          <div className="w-full">
                            <TextInput
                              className="w-full"
                              type="text"
                              color={validPhone === true ? "success" : "gray"}
                              placeholder={router.locale == 'default' ? "Số điện thoại" : router.locale == 'en' ? "Phone number" : "電話番号"}
                              value={phone}
                              onChange={(e: any) => {
                                setPhone(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center pl-2 mt-2 ">
                          <Label className="w-1/3">{t("Địa chỉ cụ thể:")}</Label>
                          <div className="w-full">
                            <TextInput
                              className="w-full"
                              type="text"
                              color={validAddress === true ? "success" : "gray"}
                              placeholder={router.locale == 'default' ? "địa chỉ giao hàng" : router.locale == 'en' ? "address" : "アドレス"}
                              value={address}
                              onChange={(e: any) => {
                                setAdress(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center pl-2 mt-2 ">
                          <Label className="w-1/3">{t("Tỉnh/Thành:")}</Label>
                          <Select
                            className="w-full"
                            id="state"
                            color={city !== "" ? "success" : "gray"}
                            required={true}
                            value={city}
                            onChange={(e: any) => {
                              setCity(e.target.value);
                              try {
                                axios
                                  .get(
                                    `/homepage/provinces/${e.target.value}`
                                  )
                                  .then((res: any) => {
                                    setProDictricts(res.data[0]);
                                  });
                              } catch (error) {
                                console.log(error);
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
                        </div>

                        <div className="flex items-center pl-2 mt-2 ">
                          <Label className="w-1/3">{t("Quận/Huyện:")}</Label>
                          <Select
                            disabled={city === "" ? true : false}
                            className="w-full"
                            id="state"
                            color={district !== "" ? "success" : "gray"}
                            required={true}
                            value={district}
                            onChange={(e: any) => {
                              setDistrict(e.target.value);
                              try {
                                axios
                                  .get(
                                    `/homepage/provinces/city/${e.target.value}`
                                  )
                                  .then((res: any) => {
                                    setProWards(
                                      res.data[0].wards
                                    );
                                  });
                              } catch (error) {
                                console.log(error);
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
                                      <option
                                        value={item.districts}
                                        key={index}
                                      >
                                        {item.districts}
                                      </option>
                                    );
                                  }
                                )
                              : null}
                          </Select>
                        </div>

                        <div className="flex items-center pl-2 mt-2 ">
                          <Label className="w-1/3">{t("Phường/Xã:")}</Label>
                          <Select
                            disabled={district === "" ? true : false}
                            className="w-full"
                            id="state"
                            color={ward !== "" ? "success" : "gray"}
                            required={true}
                            value={ward}
                            onChange={(e: any) => {
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
                        <div className="flex items-center justify-center mt-6">
                          <Button
                            size="xs"
                            color="success"
                            disabled={!isUpdate}
                            onClick={handleUpdateAdd}
                          >
                            {t("Cập nhật")}
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-3">
                    <div className="flex items-center pl-2">
                      <Label className="w-1/3">Email:</Label>
                      <div className="w-full">
                        <TextInput
                          type="email"
                          color={validEmail === true ? "success" : "gray"}
                          placeholder={router.locale == 'default' ? "Email" : router.locale == 'en' ? "Email" : "メール"}
                          value={email}
                          helperText={
                            validEmail === false ? (
                              <React.Fragment>
                                <p className="text-xs text-end w-full text-red-500">
                                  {t("Email không hợp lệ")}
                                </p>
                              </React.Fragment>
                            ) : null
                          }
                          onChange={(e: any) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center pl-2 mt-2 ">
                      <Label className="w-1/3">{t("Họ và tên:")}</Label>
                      <div className="w-full">
                        <TextInput
                          className="w-full"
                          type="text"
                          color={validName === true ? "success" : "gray"}
                          placeholder={router.locale == 'default' ? "Nhập họ và tên" : router.locale == 'en' ? "Fullname" : "フルネーム"}
                          value={name}
                          helperText={
                            validName === false ? (
                              <React.Fragment>
                                <p className="text-xs text-end w-full text-red-500">
                                  {t("Họ và tên không hợp lệ")}
                                </p>
                              </React.Fragment>
                            ) : null
                          }
                          onChange={(e: any) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center pl-2 mt-2 ">
                      <Label className="w-1/3">{t("Số điện thoại:")}</Label>
                      <div className="w-full">
                        <TextInput
                          className="w-full"
                          type="text"
                          color={validPhone === true ? "success" : "gray"}
                          placeholder={router.locale == 'default' ? "Số điện thoại" : router.locale == 'en' ? "Phone number" : "電話番号"}
                          value={phone}
                          helperText={
                            validPhone === false ? (
                              <React.Fragment>
                                <p className="text-xs text-end w-full text-red-500">
                                  {t("Số điện thoại không hợp lệ")}
                                </p>
                              </React.Fragment>
                            ) : null
                          }
                          onChange={(e: any) => {
                            setPhone(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center pl-2 mt-2 ">
                      <Label className="w-1/3">{t("Địa chỉ cụ thể:")}</Label>
                      <div className="w-full">
                        <TextInput
                          className="w-full"
                          type="text"
                          color={validAddress === true ? "success" : "gray"}
                          placeholder={router.locale == 'default' ? "địa chỉ giao hàng" : router.locale == 'en' ? "address" : "アドレス"}
                          value={address}
                          helperText={
                            validAddress === false ? (
                              <React.Fragment>
                                <p className="text-xs text-end w-full text-red-500">
                                  {t("Địa chỉ không hợp lệ")}
                                </p>
                              </React.Fragment>
                            ) : null
                          }
                          onChange={(e: any) => {
                            setAdress(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center pl-2 mt-2 ">
                      <Label className="w-1/3">{t("Tỉnh/Thành:")}</Label>
                      <Select
                        className="w-full mt-2"
                        id="state"
                        color={city !== "" ? "success" : "gray"}
                        required={true}
                        value={city}
                        onChange={(e: any) => {
                          setCity(e.target.value);
                          try {
                            axios
                              .get(
                                `/homepage/provinces/${e.target.value}`
                              )
                              .then((res: any) => {
                                setProDictricts(res.data[0]);
                              });
                          } catch (error) {
                            console.log(error);
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
                    </div>

                    <div className="flex items-center pl-2 mt-2 ">
                      <Label className="w-1/3">{t("Quận/Huyện:")}</Label>
                      <Select
                        disabled={city === "" ? true : false}
                        className="w-full mt-2"
                        id="state"
                        color={district !== "" ? "success" : "gray"}
                        required={true}
                        value={district}
                        onChange={(e: any) => {
                          setDistrict(e.target.value);
                          try {
                            axios
                              .get(
                                `/homepage/provinces/city/${e.target.value}`
                              )
                              .then((res: any) => {
                                setProWards(
                                  res.data[0].wards
                                );
                              });
                          } catch (error) {
                            console.log(error);
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
                    </div>

                    <div className="flex items-center pl-2 mt-2 ">
                      <Label className="w-1/3">{t("Phường/Xã:")}</Label>
                      <Select
                        disabled={district === "" ? true : false}
                        className="w-full mt-2"
                        id="state"
                        color={ward !== "" ? "success" : "gray"}
                        required={true}
                        value={ward}
                        onChange={(e: any) => {
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
                  </div>
                )}
              </div>

              <div>
                <h1 className="font-bold">{t("Vận chuyển")}</h1>

                <div className="border border-gray-200 rounded-md mt-3">
                  <div className="flex hover:bg-green-50 items-center justify-between px-3 pt-3 border-b border-gray-200 pb-3">
                    <div className="flex items-center">
                      <input
                        defaultChecked
                        id="default-radio-1"
                        type="radio"
                        name="trans-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e: any) => {
                          setFee(35000);
                        }}
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                      >
                        J&T 35.000đ
                      </label>
                    </div>

                    <img
                      className="h-10 w-10 rounded-md"
                      src="/image/jtexpress.png"
                      alt="momo"
                    />
                  </div>

                  <div className="flex hover:bg-green-50 items-center justify-between px-3 pt-3 border-b border-gray-200 pb-3">
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        name="trans-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e: any) => {
                          setFee(50000);
                        }}
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                      >
                         {t("Vận chuyển hoả tốc ")}50.000đ
                      </label>
                    </div>

                    <img
                      className="h-10 w-10 rounded-md"
                      src="/image/expressdelivery.png"
                      alt="momo"
                    />
                  </div>
                </div>

                <h1 className="font-bold mt-6">{t("Thanh Toán")}</h1>

                <div className="border border-gray-200 rounded-md mt-3">
                  <div className="flex hover:bg-green-50 items-center justify-between px-3 pt-3 border-b border-gray-200 pb-3">
                    <div className="flex items-center">
                      <input
                        defaultChecked
                        id="default-radio-1"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e: any) => {
                          setPaymentMethod("cod");
                        }}
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                      >
                         {t("Thanh toán khi giao hàng ")}(COD)
                      </label>
                    </div>

                    <img
                      className="h-10 w-10 rounded-md"
                      src="/image/cash.png"
                      alt="momo"
                    />
                  </div>

                  <div className="flex hover:bg-green-50 items-center justify-between px-3 pt-3 border-b border-gray-200 pb-3">
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e: any) => {
                          setPaymentMethod("bank");
                        }}
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                      >
                        {t("Thanh Toán Trực Tuyến")}
                      </label>
                    </div>

                    <img
                      className="h-10 w-10 rounded-md"
                      src="/image/payvisa.png"
                      alt="momo"
                    />
                  </div>

                  <div className="flex hover:bg-green-50 items-center justify-between px-3 pt-3 border-b border-gray-200 pb-3">
                    <div className="flex items-center">
                      <input
                        id="default-radio-3"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e: any) => {
                          setPaymentMethod("momo");
                        }}
                      />
                      <label
                        htmlFor="default-radio-3"
                        className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                      >
                        {t("Thanh toán qua Ví điện tử MoMo")}
                      </label>
                    </div>

                    <img
                      className="h-10 w-10 rounded-md"
                      src="/image/momo.png"
                      alt="momo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 justify-end mt-3 text-green-500 mb-8">
            <div>
              <Link
                href=""
                onClick={(e: any) => {
                  e.preventDefault();
                  setSecurityModal(!secutityModal);
                }}
              >
                {t("Chính sách bảo mật")}
              </Link>
              <SecurityModal
                secutityModal={secutityModal}
                setSecurityModal={setSecurityModal}
              />
            </div>
            <div>
              <Link
                href=""
                onClick={(e: any) => {
                  e.preventDefault();
                  setTcModal(!tcModal);
                }}
              >
                {t("Điều khoản sử dụng")}
              </Link>
              <TcModal tcModal={tcModal} setTcModal={setTcModal} />
            </div>
          </div>
        </div>

        <div className="lg:col-start-3 lg:col-end-4 bg-gray-50 border border-gray-300 md:h-screen pb-10">
          <div className="flex justify-end gap-2 font-medium text-xl py-3 border-b border-gray-300 px-3">
            <h1>{t("Đơn hàng")}</h1>
            <p>({totalItems}  {t("sản phẩm")})</p>
          </div>

          <div className="mt-6 text-xs px-6 border-b border-gray-300 pb-3">
            {items?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="flex gap-2 items-center justify-between mb-3"
                >
                  <div className="flex gap-2 items-center w-9/12">
                    <div className="relative">
                      <Link href={"/product/" + item?.product?.slug}>
                        <img
                          className="h-10 w-12 rounded-md object-cover"
                          src={item?.product?.image}
                          alt=""
                        />
                      </Link>
                      <div className="-right-2.5 -top-2 text-white absolute bg-[#6abd47] px-1.5 text-[9px] font-medium rounded-full text-center">
                        <span>{item.quantity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start w-full">
                      <div className="flex gap-1">
                        <p>{router.locale === "default"
                              ? `${item?.product?.productName}`
                              : `${item?.name}`}</p>
                      </div>
                      <p className="text-sm text-gray-400">descript</p>
                    </div>
                  </div>
                  <div className="w-fit">
                    {Intl.NumberFormat().format(item.itemTotal) + " ₫"}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2 border-b border-gray-300 py-4 px-6">
            <TextInput className="w-3/5" 
            placeholder={router.locale == 'default' ? "Nhập mã giảm giá" : router.locale == 'en' ? "Discount code" : "ディスカウントコード"}
            />
            <Button
              disabled={true}
              className="w-2/5 bg-green-600 hover:bg-green-800"
            >
              <p className="md:text-xs lg:text-sm">{t("Áp dụng")}</p>
            </Button>
          </div>

          <div className="mt-6 mx-6 border-b border-gray-300 pb-3">
            <div className="flex items-center justify-between">
              <p>{t("Tạm tính:")}</p>
              <p>{Intl.NumberFormat().format(cartTotal) + " ₫"}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p>{t("Phí vận chuyển")}</p>
              <p>{Intl.NumberFormat().format(fee) + " ₫"}</p>
            </div>
          </div>

          <div className="mt-3 mx-6">
            <div className="flex items-center justify-between">
              <p className="text-xl">{t("Tổng cộng")}</p>
              <p className="text-green-500 text-xl font-medium">
                {Intl.NumberFormat().format(total) + " ₫"}
              </p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <Link href={"/cart"} className="text-green-500">
                <div className="flex gap-1 items-center">
                  <HiOutlineChevronLeft />
                  <p>{t("Quay về giỏ hàng")}</p>
                </div>
              </Link>
              <Button
                disabled={
                  isDisable || users?.email !== undefined ? false : true
                }
                className="bg-green-600 w-2/5 hover:bg-green-800"
                onClick={handlePay}
              >
                {t("Đặt hàng")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex items-center gap-4 justify-end mt-3 text-green-500 mb-8">
        <LoginModal isLogin={isLogin} setIsLogin={setIsLogin} />
        <div>
          <Link
            href=""
            onClick={(e: any) => {
              e.preventDefault();
              setSecurityModal(!secutityModal);
            }}
          >
            {t("Chính sách bảo mật")}
          </Link>
          <SecurityModal
            secutityModal={secutityModal}
            setSecurityModal={setSecurityModal}
          />
        </div>
        <div>
          <Link
            href=""
            onClick={(e: any) => {
              e.preventDefault();
              setTcModal(!tcModal);
            }}
          >
            {t("Điều khoản sử dụng")}
          </Link>
          <TcModal tcModal={tcModal} setTcModal={setTcModal} />
        </div>
      </div>
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <CartProvider>
      <>{page}</>
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
