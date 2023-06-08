import { useEffect, useRef, useState } from "react";
import {
  HiOutlineLogin,
  HiOutlineUserAdd,
  HiPhone,
  HiOutlineShoppingBag,
  HiOutlineSearch,
  HiOutlineMenu,
  HiX,
  HiLogout,
} from "react-icons/hi";
import Link from "next/link";
import { Dropdown, TextInput } from "flowbite-react";
import { useCart } from "react-use-cart";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import axios from "../../other/axios";

export default function TopBar({ visible, setVisible }: any) {
  const { totalItems, isEmpty } = useCart();
  const [categories, setCategories] = useState([] as any);
  const [search, setSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const searchref: any = useRef();
  const [result, setResult] = useState([] as any);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState([] as any);
  const timeout: any = useRef();
  const inputRef: any = useRef();
  const { t } = useTranslation("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : "";
    setUser(user);
  }, []);

  useEffect(() => {
    let language = router.locale;
    try {
      axios
        .get(
          `/product/category?lang=${
            language === "default" ? "en" : language === "ja" ? "ja" : "en"
          }`
        )
        .then((res: any) => {
          setCategories(res?.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  useEffect(() => {
    let handler = (e: any) => {
      if (!searchref.current?.contains(e.target)) {
        setInputSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleSearch = async (e: any) => {
    setInputSearch(e.target.value);
    clearTimeout(timeout.current);

    if (!inputRef.current.value.trim()) {
      setResult([]);
      return;
    }

    timeout.current = setTimeout(async () => {
      let language = router.locale;
      try {
        await axios
          .get(
            `/product?page=${page}&take=10&sortField=${
              e.target.value
            }&search=searchall&lang=${
              language === "default" ? "en" : language === "ja" ? "ja" : "en"
            }`
          )
          .then((res) => {
            setResult(res.data[0]);
          });
      } catch (error) {
        console.log(error);
      }
    }, 500);
  };

  return (
    <div className="bg-[#194a0f] text-white text-sm font-medium">
      {search ? (
        <div className="text-black relative font-normal bg-white h-20 flex justify-center items-center">
          <div className="flex items-center w-2/3">
            <HiOutlineSearch className="w-fit text-lg" />
            <input
              className="border-white focus:border-white focus:ring-white w-full"
              value={inputSearch}
              type="search"
              placeholder={
                router.locale == "default"
                  ? "Bạn đang tìm kiếm điều gì?"
                  : router.locale == "en"
                  ? "What are you looking for?"
                  : "何を探していますか"
              }
              required
              onChange={handleSearch}
              // icon={}
            />
          </div>
          <button
            className="text-xl absolute right-1 top-1 bg-white"
            onClick={() => setSearch(false)}
          >
            <HiX />
          </button>
        </div>
      ) : null}

      {user ? (
        <div className="flex justify-center md:justify-between py-2 w-11/12 mx-auto">
          <h1 className="hidden md:block">{t("ALL FOR YOUR HEALTH")}</h1>
          <div className="flex items-center gap-2">
            <Link href={"/account"}>
              <div className="flex gap-2 items-center border-r border-white pr-2">
                <img
                  className="h-5 w-5 rounded-full object-cover"
                  src={user.image}
                  alt="avatar"
                />
                <div className="flex gap-2 items-center">
                  <p className="hidden md:block text-xs uppercase">
                    {t("xin chào, ")}
                  </p>
                  <p className="text-xs uppercase"> {user.username}</p>
                </div>
              </div>
            </Link>
            <Link href={"/logout"}>
              <div className="flex gap-1 items-center">
                <HiLogout />
                <p className="text-xs">{t("Đăng xuất")}</p>
              </div>
            </Link>
            <div className="flex items-center justify-center gap-2 ml-3">
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, {
                    locale: "default",
                  });
                }}
              >
                <img
                  className="w-fit h-4"
                  src="/image/vietnam.png"
                  alt="language"
                />
              </button>
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, { locale: "en" });
                }}
              >
                <img
                  className="w-fit h-4"
                  src="/image/england.png"
                  alt="language"
                />
              </button>
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, { locale: "ja" });
                }}
              >
                <img
                  className="w-fit h-4"
                  src="/image/japan.png"
                  alt="language"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center md:justify-between py-2 w-11/12 mx-auto">
          <h1>{t("ALL FOR YOUR HEALTH")}</h1>
          <div className="md:flex items-center gap-2 hidden">
            <Link href={"/login"}>
              <div className="flex gap-1 items-center border-r border-white pr-2">
                <HiOutlineLogin />
                <p className="text-xs">{t("Đăng nhập")}</p>
              </div>
            </Link>
            <Link href={"/register"}>
              <div className="flex gap-1 items-center">
                <HiOutlineUserAdd />
                <p className="text-xs">{t("Đăng ký")}</p>
              </div>
            </Link>
            <div className="flex items-center justify-center gap-2 ml-3">
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, {
                    locale: "default",
                  });
                }}
              >
                <img
                  className="w-6 h-4"
                  src="/image/vietnam.png"
                  alt="language"
                />
              </button>
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, { locale: "en" });
                }}
              >
                <img
                  className="w-6 h-4"
                  src="/image/england.png"
                  alt="language"
                />
              </button>
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, { locale: "ja" });
                }}
              >
                <img
                  className="w-6 h-4"
                  src="/image/japan.png"
                  alt="language"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#236815] py-2 ">
        <div className=" flex justify-between items-center w-11/12 mx-auto">
          <div className="flex gap-2 items-center">
            <HiOutlineMenu
              onClick={(e: any) => {
                setVisible(!visible);
              }}
              className="text-xl md:hidden cursor-pointer"
            />
            <Link className="flex gap-2 items-center" href={"/"}>
              <img
                className="h-14 w-14 md:h-20 md:w-20 rounded-full"
                src="/image/logo.png"
                alt="logo"
              />
              <h1 className="hidden sm:block md:text-2xl font-bold">
                PHUC FRESH
              </h1>
            </Link>
          </div>

          <div className="w-4/12 md:relative">
            <TextInput
              className="hidden md:block"
              sizing="md"
              type="search"
              placeholder={
                router.locale == "default"
                  ? "Bạn đang tìm kiếm điều gì?"
                  : router.locale == "en"
                  ? "What are you looking for?"
                  : "何を探していますか"
              }
              required
              icon={HiOutlineSearch}
              value={inputSearch}
              onChange={handleSearch}
              ref={inputRef}
            />
            {inputSearch === "" ? null : (
              <div
                className="text-xs left-0 w-full top-[80px] md:top-[42px] bg-white text-black h-auto absolute z-30 rounded-lg pb-1"
                ref={searchref}
              >
                {result !== null
                  ? result.map((res: any) => {
                      return (
                        <Link
                          href={"/product/" + res?.product?.slug}
                          key={res.id}
                          onClick={(e: any) => {
                            setResult(null);
                          }}
                        >
                          <div className="flex gap-3 items-center border-b border-gray-300 w-full py-1 hover:bg-gray-100 px-3">
                            <img
                              src={res?.product?.productimage[0]?.url}
                              className="w-12 h-12 rounded-md"
                            />
                            <div className="flex flex-col items-start">
                              <h1>
                                {router.locale === "default"
                                  ? res?.product?.productName
                                  : res?.name}
                              </h1>
                              <h1 className="font-medium">
                                {Intl.NumberFormat().format(
                                  res?.product?.price
                                )}
                                đ
                              </h1>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  : null}
              </div>
            )}
          </div>

          <div className="flex gap-6 items-center">
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:0949119338">
                <HiPhone className="text-3xl" />
              </a>
              <div className="flex flex-col gap-1 items-center border-white border-l pl-3">
                <p> Hotline 24/7</p>
                <p className="text-lg">0949 119 338</p>
              </div>
            </div>

            <HiOutlineSearch
              onClick={() => setSearch(!search)}
              className="text-xl font-bold block md:hidden cursor-pointer"
            />
            <Link href={"/cart"}>
              <div className="relative">
                <HiOutlineShoppingBag className="text-3xl" />
                {isEmpty ? null : (
                  <div className="-right-2.5 -top-2 absolute bg-[#f9c938] px-1.5 text-sm rounded-full text-center">
                    <span>{totalItems}</span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:items-center md:justify-evenly md:gap-3 py-3 w-11/12 mx-auto text-xs uppercase">
        {categories
          ? categories.map((item: any) => {
              return (
                <Link
                  className="text-center"
                  key={item?.id}
                  href={item?.category?.path}
                >
                  {router.locale === "en"
                    ? item?.name
                    : router.locale === "ja"
                    ? item?.name
                    : item?.category?.category}
                </Link>
              );
            })
          : null}
      </div>
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
