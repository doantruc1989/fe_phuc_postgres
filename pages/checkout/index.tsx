import {
  Button,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
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
import { socket } from "../../other/socketIo";
import useAxiosPrivate from "../../other/useAxiosPrivate";
import JandTapi from "../components/JandTapi";
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
  const [feeFromApi, setFeeFromApi] = useState(0);
  const [transFee, setTransFee] = useState(0);
  const [transportBy, setTransportBy] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { totalItems, items, cartTotal } = useCart();
  const [total, setTotal] = useState(cartTotal);
  const [totalWeight, setTotalWeight] = useState(0);
  const [secutityModal, setSecurityModal] = useState(false);
  const [isTakingFee, setTakingFee] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const [note, setNote] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [isCoupon, setIsCoupon] = useState(false);
  const [couponValue, setCouponValue] = useState(0);
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

  useEffect(() => {
    let weight = 0;
    for (let i = 0; i < items.length; i++) {
      weight += +items[i]?.product?.weight * items[i].quantity!;
    }
    return setTotalWeight(weight);
  }, []);

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
    const userAddress = user?.address?.split(", ");
    if (totalWeight !== 0) {
      setTakingFee(true);
      try {
        axios
          .get(
            `/homepage/checkfee?search=checkfee&filter=${userAddress[1]}&sortField=${userAddress[0]}&condition2=${userAddress[2]}&condition=${totalWeight}`
          )
          .then((res: any) => {
            setTakingFee(false);
            setIsLoading(true);
            setFeeFromApi(res?.data?.data?.total + 10000);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [isChange, users, totalWeight]);

  useEffect(() => {
    setFee(feeFromApi);
  }, [feeFromApi]);

  useEffect(() => {
    const axios = async () => {
      axiosPrivate.get(`/users/${user.id}`).then((res) => {
        setUsers(res?.data);
      });
    };

    if (user.tokens) {
      axios();
    }
    return;
  }, [isChange, isLogin]);

  useEffect(() => {
    try {
      axios.get("/homepage/provinces/all").then((res: any) => {
        setProvinces(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    isCoupon === false
      ? setTotal(cartTotal + fee)
      : couponValue === null
      ? setTotal(cartTotal)
      : setTotal(cartTotal + (fee - couponValue <= 0 ? 0 : fee - couponValue));
  }, [fee, isCoupon, couponValue]);

  useEffect(() => {
    isCoupon === false
      ? setTransFee(fee)
      : couponValue === null
      ? setTransFee(0)
      : setTransFee(fee - couponValue <= 0 ? 0 : fee - couponValue);
  }, [fee, isCoupon, couponValue]);

  const handleUpdateAdd = () => {
    const axios = async () => {
      try {
        axiosPrivate
          .put(`/users/${users.id}`, {
            address:
              address !== ""
                ? `${city}, ${district}, ${ward}, ${address}`
                : users.address,
            phone: phone !== "" ? phone : users.phone,
          })
          .then((res: any) => {
            const newUser = {
              ...user,
              address:
                `${city}, ${district}, ${ward}, ${address}` || users.address,
              phone: res?.data.phone || users.phone,
            };
            localStorage.setItem("user", JSON.stringify(newUser));
            setIsChange(false);
            setPhone("");
            setAdress("");
            setDistrict("");
            setCity("");
            setWard("");
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
            users?.address || `${city}, ${district}, ${ward}, ${address}`,
          phone: users?.phone || phone,
          trans: transFee,
          transportBy: transportBy,
          cartTotal: total,
          user: users.id || null,
          orderItems: JSON.stringify(items),
          paymentMethod: paymentMethod,
          weight: totalWeight,
          note: note,
          guest: users?.id === undefined ? email + " " + name : null,
        })
        .then((res: any) => {
          const data = {
            title: `new order ${res.data.id}`,
            path: "/order",
          };
          socket.emit("msgTobe", data);
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
                          setCity("");
                          setDistrict("");
                          setWard("");
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
                              placeholder={
                                router.locale == "default"
                                  ? "Số điện thoại"
                                  : router.locale == "en"
                                  ? "Phone number"
                                  : "電話番号"
                              }
                              value={phone}
                              onChange={(e: any) => {
                                setPhone(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center pl-2 mt-2 ">
                          <Label className="w-1/3">
                            {t("Địa chỉ cụ thể:")}
                          </Label>
                          <div className="w-full">
                            <TextInput
                              className="w-full"
                              type="text"
                              color={validAddress === true ? "success" : "gray"}
                              placeholder={
                                router.locale == "default"
                                  ? "địa chỉ giao hàng"
                                  : router.locale == "en"
                                  ? "address"
                                  : "アドレス"
                              }
                              value={address}
                              onChange={(e: any) => {
                                setAdress(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center pl-2 mt-2 ">
                          <Label className="w-1/3">{t("Tỉnh-Thành:")}</Label>
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
                                  .get(`/homepage/provinces/${e.target.value}`)
                                  .then((res: any) => {
                                    setProDictricts(res.data[0]);
                                    setDistrict("");
                                    setWard("");
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
                          <Label className="w-1/3">{t("Quận-Huyện:")}</Label>
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
                                    setProWards(res.data[0].wards);
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
                          <Label className="w-1/3">{t("Phường-Xã:")}</Label>
                          <Select
                            disabled={district === "" ? true : false}
                            className="w-full"
                            id="state"
                            color={ward !== "" ? "success" : "gray"}
                            required={true}
                            value={ward}
                            onChange={async (e: any) => {
                              setWard(e.target.value);
                              if (totalWeight !== 0) {
                                setTakingFee(true);
                                try {
                                  await axios
                                    .get(
                                      `/homepage/checkfee?search=checkfee&filter=${district}&sortField=${city}&condition2=${e.target.value}&condition=${totalWeight}`
                                    )
                                    .then((res: any) => {
                                      setIsLoading(true);
                                      setTakingFee(false);
                                      setFeeFromApi(
                                        res?.data?.data?.total + 10000
                                      );
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
                          placeholder={
                            router.locale == "default"
                              ? "Email"
                              : router.locale == "en"
                              ? "Email"
                              : "メール"
                          }
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
                          placeholder={
                            router.locale == "default"
                              ? "Nhập họ và tên"
                              : router.locale == "en"
                              ? "Fullname"
                              : "フルネーム"
                          }
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
                          placeholder={
                            router.locale == "default"
                              ? "Số điện thoại"
                              : router.locale == "en"
                              ? "Phone number"
                              : "電話番号"
                          }
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
                          placeholder={
                            router.locale == "default"
                              ? "địa chỉ giao hàng"
                              : router.locale == "en"
                              ? "address"
                              : "アドレス"
                          }
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
                      <Label className="w-1/3">{t("Tỉnh-Thành:")}</Label>
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
                              .get(`/homepage/provinces/${e.target.value}`)
                              .then((res: any) => {
                                setProDictricts(res.data[0]);
                                setDistrict("");
                                setWard("");
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
                      <Label className="w-1/3">{t("Quận-Huyện:")}</Label>
                      <Select
                        disabled={city === "" ? true : false}
                        className="w-full mt-2"
                        id="state"
                        color={district !== "" ? "success" : "gray"}
                        required={true}
                        value={district}
                        onChange={async (e: any) => {
                          setDistrict(e.target.value);
                          try {
                            await axios
                              .get(`/homepage/provinces/city/${e.target.value}`)
                              .then((res: any) => {
                                setProWards(res.data[0].wards);
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
                      <Label className="w-1/3">{t("Phường-Xã:")}</Label>
                      <Select
                        disabled={district === "" ? true : false}
                        className="w-full mt-2"
                        id="state"
                        color={ward !== "" ? "success" : "gray"}
                        required={true}
                        value={ward}
                        onChange={async (e: any) => {
                          setWard(e.target.value);
                          if (totalWeight !== 0) {
                            setTakingFee(true);
                            try {
                              await axios
                                .get(
                                  `/homepage/checkfee?search=checkfee&filter=${district}&sortField=${city}&condition2=${e.target.value}&condition=${totalWeight}`
                                )
                                .then((res: any) => {
                                  setIsLoading(true);
                                  setTakingFee(false);
                                  setFeeFromApi(res?.data?.data?.total + 10000);
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
                {isLoading === false ? (
                  <div className="px-1 text-end italic mt-2">
                    Bạn vui lòng nhập địa chỉ để chúng tôi tính toán phí vận
                    chuyển.
                  </div>
                ) : (
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
                            setFee(feeFromApi);
                            setTransportBy("standard");
                          }}
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="flex items-center gap-2 ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                        >
                          <p>GH Nhanh:</p>
                          {isTakingFee === true ? (
                            <Spinner color="success" />
                          ) : (
                            <p>
                              {Intl.NumberFormat().format(feeFromApi) + "₫"}
                            </p>
                          )}
                        </label>
                      </div>

                      <img
                        className="h-10 w-10 rounded-md"
                        src="/image/ghn.png"
                        alt="ghn"
                      />
                    </div>
                    {city === "Thành phố Hồ Chí Minh" ||
                    users?.address?.split(",")[0] ===
                      "Thành phố Hồ Chí Minh" ? (
                      <div className="flex hover:bg-green-50 items-center justify-between px-3 pt-3 border-b border-gray-200 pb-3">
                        <div className="flex items-center">
                          <input
                            id="default-radio-2"
                            type="radio"
                            name="trans-radio"
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e: any) => {
                              setFee(50000);
                              setTransportBy("express");
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
                    ) : null}
                  </div>
                )}

                <h1 className="font-bold mt-6">{t("Thanh Toán")}</h1>

                <div className="border border-gray-200 rounded-md mt-3">
                  <div className="flex hover:bg-green-50 items-center justify-between px-3 pt-3 border-b border-gray-200 pb-3">
                    <div className="flex items-center">
                      <input
                        defaultChecked
                        id="default-radio-3"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e: any) => {
                          setPaymentMethod("cod");
                        }}
                      />
                      <label
                        htmlFor="default-radio-3"
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
                        id="default-radio-4"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e: any) => {
                          setPaymentMethod("bank");
                        }}
                      />
                      <label
                        htmlFor="default-radio-4"
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
                        id="default-radio-5"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e: any) => {
                          setPaymentMethod("momo");
                        }}
                      />
                      <label
                        htmlFor="default-radio-5"
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

                <h1 className="font-bold mt-6">{t("Ghi Chú")}</h1>
                <Textarea
                  className="mt-3"
                  color={"success"}
                  value={note}
                  onChange={(e: any) => setNote(e.target.value)}
                />
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

        <div className="lg:col-start-3 lg:col-end-4 bg-gray-50 border border-gray-300 md:h-auto pb-10">
          <div className="flex justify-end gap-2 font-medium text-xl py-3 border-b border-gray-300 px-3">
            <h1>{t("Đơn hàng")}</h1>
            <p>
              ({totalItems} {t("sản phẩm")})
            </p>
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
                          src={item?.product?.productimage[0]?.url}
                          alt=""
                        />
                      </Link>
                      <div className="-right-2.5 -top-2 text-white absolute bg-[#6abd47] px-1.5 text-[9px] font-medium rounded-full text-center">
                        <span>{item.quantity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start w-full">
                      <div className="flex gap-1">
                        <p>
                          {router.locale === "default"
                            ? `${item?.product?.productName}`
                            : `${item?.name}`}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        {item?.itemType?.variantAttribute?.map((res: any) => {
                          return <p key={res.id}>{res.attribute.value}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="w-fit">
                    {Intl.NumberFormat().format(item.itemTotal) + " ₫"}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b border-gray-300 py-4 px-6">
            <div className="flex items-center justify-between gap-2 ">
              <TextInput
                className="w-full"
                placeholder={
                  router.locale == "default"
                    ? "Nhập mã giảm giá"
                    : router.locale == "en"
                    ? "Discount code"
                    : "ディスカウントコード"
                }
                value={coupon}
                onChange={(e: any) => {
                  setCoupon(e.target.value);
                }}
              />
              <Tooltip
                className="w-fit"
                animation="duration-500"
                content="freeship freeship10 freeship20 freeship30"
              >
                <Button
                  disabled={coupon === "" ? true : false}
                  className="bg-green-600 hover:bg-green-800 truncate"
                  onClick={async () => {
                    try {
                      axios.defaults.headers.common[
                        "Authorization"
                      ] = `Bearer ${user?.tokens?.accessToken}`;
                      await axios
                        .get(`/product/coupon/${coupon}`)
                        .then((res: any) => {
                          if (res?.data?.name === coupon) {
                            setCoupon("");
                            setCouponValue(res?.data?.value);
                            setIsCoupon(true);
                            return toast("Apply coupon successfully", {
                              position: toast.POSITION.TOP_RIGHT,
                              type: toast.TYPE.SUCCESS,
                              className: "toast-message",
                            });
                          }
                          toast("Invalid Coupon", {
                            position: toast.POSITION.TOP_RIGHT,
                            type: toast.TYPE.ERROR,
                            className: "toast-message",
                          });
                        });
                    } catch (error) {
                      toast("Coupon is only applied to registered customers", {
                        position: toast.POSITION.TOP_RIGHT,
                        type: toast.TYPE.ERROR,
                        className: "toast-message",
                      });
                    }
                  }}
                >
                  <p className="md:text-xs lg:text-sm">{t("Áp dụng")}</p>
                </Button>
              </Tooltip>
            </div>

            {isCoupon === false ? null : couponValue === null ? (
              <p className="w-full text-center mt-2 text-xs text-green-700 italic">
                *{t("Bạn đã được miễn phí vận chuyển")}
              </p>
            ) : (
              <p className="w-full text-center mt-2 text-xs text-green-700 italic">
                *{t("Bạn đã được giảm ")}
                {couponValue}đ{t(" phí vận chuyển.")}
              </p>
            )}
          </div>

          <div className="mt-6 mx-6 border-b border-gray-300 pb-3">
            <div className="flex items-center justify-between">
              <p>{t("Tạm tính:")}</p>
              <p>{Intl.NumberFormat().format(cartTotal) + " ₫"}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p>{t("Phí vận chuyển")}</p>
              <p>{Intl.NumberFormat().format(transFee) + " ₫"}</p>
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
                  isDisable ||
                  (users?.email !== undefined &&
                    feeFromApi !== 0 &&
                    isChange === false)
                    ? false
                    : true
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
