import { Breadcrumb, Pagination, Rating } from "flowbite-react";
import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function Index() {
  const [vnFruits, setVnFruits] = useState([] as any);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("");
  const [condition2, setCondition2] = useState("");
  const [sortField, setSortField] = useState("");
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const router = useRouter();
  const { t } = useTranslation("");
  useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:3007/product?page=${page}&take=20&filter=3&condition2=${condition2}&condition=${condition}&sortField=${sortField}&fromPrice=${fromPrice}&toPrice=${toPrice}&search=${search}`
        )
        .then((res: any) => {
          setVnFruits(res.data[0]);
          setTotalItems(res.data[1]);
        });
    } catch (error) {
      console.log(error);
    }
  }, [page, condition, condition2, sortField, fromPrice, toPrice, search]);

  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en" : "/"}
          icon={HiHome}
        >
          {t("Trang chủ")}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t("Quà tặng trái cây")}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="md:grid md:grid-cols-4 md:gap-6 w-full md:w-11/12 lg:w-9/12 mx-auto mb-6">
        <div className="col-start-1 col-end-2 hidden md:block">
          <div className="mt-6 border border-gray-200">
            <h1 className="bg-gray-200 mx-1 mt-1 pl-2 uppercase font-medium py-2">
              {t("tìm theo")}
            </h1>
            <div className="pl-1 my-2">
              <p className="font-medium text-sm mt-3">{t("Loại")}</p>
              <div className="mt-3">
                <button
                  className={`${
                    condition2 === "Giỏ quà"
                      ? "bg-green-600 text-white"
                      : "border-gray-200"
                  } ml-1 mb-2 px-2 rounded-xl border hover:bg-green-600 hover:text-white bg-white w-fit`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage(1);
                    setFromPrice("");
                    setToPrice("");
                    setCondition("");
                    setCondition2("Giỏ quà");
                    setSearch("bybrand");
                    setSortField("");
                  }}
                >
                  {t("Giỏ quà")}
                </button>

                <button
                  className={`${
                    condition2 === "Gói quà"
                      ? "bg-green-600 text-white"
                      : "border-gray-200"
                  } ml-1 mb-2 px-2 rounded-xl border hover:bg-green-600 hover:text-white bg-white w-fit`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage(1);
                    setFromPrice("");
                    setToPrice("");
                    setCondition("");
                    setCondition2("Gói quà");
                    setSearch("bybrand");
                    setSortField("");
                  }}
                >
                  {t("Gói quà")}
                </button>
              </div>

              <p className="font-medium text-sm mt-3">{t("Giá sản phẩm")}</p>
              <div className="mt-3">
                <button
                  className={`${
                    toPrice === "100000"
                      ? "bg-green-600 text-white"
                      : "border-gray-200"
                  } ml-1 mb-2 px-2 rounded-xl border hover:bg-green-600 hover:text-white bg-white w-fit`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage(1);
                    setFromPrice("0");
                    setToPrice("100000");
                    setCondition("");
                    setCondition2("");
                    setSearch("byprice");
                    setSortField("");
                  }}
                >
                  {t("Giá dưới ")}100.000đ
                </button>
                <button
                  className={`${
                    toPrice === "200000"
                      ? "bg-green-600 text-white"
                      : "border-gray-200"
                  } ml-1 mb-2 px-2 rounded-xl border hover:bg-green-600 hover:text-white bg-white w-fit`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage(1);
                    setFromPrice("100000");
                    setToPrice("200000");
                    setCondition("");
                    setCondition2("");
                    setSearch("byprice");
                    setSortField("");
                  }}
                >
                  100.000đ - 200.000đ
                </button>
                <button
                  className={`${
                    toPrice === "300000"
                      ? "bg-green-600 text-white"
                      : "border-gray-200"
                  } ml-1 mb-2 px-2 rounded-xl border hover:bg-green-600 hover:text-white bg-white w-fit`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage(1);
                    setFromPrice("200000");
                    setToPrice("300000");
                    setCondition("");
                    setCondition2("");
                    setSearch("byprice");
                    setSortField("");
                  }}
                >
                  200.000đ - 300.000đ
                </button>

                <button
                  className={`${
                    toPrice === "500000"
                      ? "bg-green-600 text-white"
                      : "border-gray-200"
                  } ml-1 mb-2 px-2 rounded-xl border hover:bg-green-600 hover:text-white bg-white w-fit`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage(1);
                    setFromPrice("300000");
                    setToPrice("500000");
                    setCondition("");
                    setCondition2("");
                    setSearch("byprice");
                    setSortField("");
                  }}
                >
                  300.000đ - 500.000đ
                </button>

                <button
                  className={`${
                    toPrice === "1000000"
                      ? "bg-green-600 text-white"
                      : "border-gray-200"
                  } ml-1 mb-2 px-2 rounded-xl border hover:bg-green-600 hover:text-white bg-white w-fit`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage(1);
                    setFromPrice("500000");
                    setToPrice("1000000");
                    setCondition("");
                    setCondition2("");
                    setSearch("byprice");
                    setSortField("");
                  }}
                >
                  500.000đ - 1.000.000đ
                </button>
                <button
                  className={`${
                    fromPrice === "1000000"
                      ? "bg-green-600 text-white"
                      : "border-gray-200"
                  } ml-1 mb-2 px-2 rounded-xl border hover:bg-green-600 hover:text-white bg-white w-fit`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage(1);
                    setFromPrice("1000000");
                    setToPrice("10000000");
                    setCondition("");
                    setCondition2("");
                    setSearch("byprice");
                    setSortField("");
                  }}
                >
                  {t("Giá trên ")}1.000.000đ
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-start-2 md:col-end-5 mt-6">
          <h1 className="font-medium uppercase">{t("Quà tặng trái cây")}</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-4 items-center mt-3 border-b pb-3">
            <p className="font-medium">{t("Xếp theo:")}</p>

            <div className="flex items-center">
              <input
                defaultChecked
                id="default-radio-1"
                type="radio"
                name="default-radio"
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={(e: any) => {
                  setPage(1);
                  setCondition("productName");
                  setSearch("ASC");
                }}
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                {t("Tên ")}A-Z
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                name="default-radio"
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={(e: any) => {
                  setPage(1);
                  setCondition("productName");
                  setSearch("DESC");
                }}
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                {t("Tên ")}Z-A
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="default-radio-3"
                type="radio"
                name="default-radio"
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={(e: any) => {
                  setPage(1);
                  setCondition("createdAt");
                  setSearch("DESC");
                }}
              />
              <label
                htmlFor="default-radio-3"
                className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                {t("Hàng mới")}
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="default-radio-4"
                type="radio"
                name="default-radio"
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={(e: any) => {
                  setPage(1);
                  setCondition("price");
                  setSearch("ASC");
                }}
              />
              <label
                htmlFor="default-radio-4"
                className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                {t("Giá thấp đến cao")}
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="default-radio-5"
                type="radio"
                name="default-radio"
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={(e: any) => {
                  setPage(1);
                  setCondition("price");
                  setSearch("DESC");
                }}
              />
              <label
                htmlFor="default-radio-5"
                className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                {t("Giá cao xuống thấp")}
              </label>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-2 grid-cols-2 md:grid-cols-3 my-3">
            {vnFruits
              ? vnFruits?.map((fruit: any) => {
                  return (
                    <div
                      key={fruit.id}
                      className="rounded-md border hover:shadow-xl border-gray-200 shadow-sm bg-white"
                    >
                      <Link  href={
                          router.locale === "en"
                            ? `/en/product/${fruit.slug}`
                            : `/product/${fruit.slug}`
                        }>
                        <div className="overflow-hidden">
                          <img
                            src={fruit.image}
                            className="rounded-t-md cursor-pointer w-full h-60 object-cover hover:scale-110 transition-all duration-500"
                            alt="..."
                          />
                        </div>
                        <div className="cursor-pointer text-center text-xs">
                          <p className="font-medium text-gray-900 dark:text-white mx-1 mt-2 text-ellipsis h-8">
                          {router.locale === "en"
                              ? `${fruit?.productEn?.enName.substring(
                                  0,
                                  30
                                )}...`
                              : `${fruit?.productName.substring(0, 30)}...`}
                          </p>
                          <div className="flex gap-3 items-center justify-center mt-1">
                            <div className="flex gap-1 pr-1 items-center border-r border-gray-200">
                              <p>{fruit.stars}</p>
                              <Rating size="sm">
                                <Rating.Star />
                              </Rating>
                            </div>
                            <div className="flex gap-1 items-center">
                              <p>{t("Đã bán")}</p>
                              <p className="font-medium">{fruit.sold}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 px-2 items-center justify-center">
                          <p className="text-xl md:text-base font-medium text-red-600 dark:text-white my-1">
                            {Intl.NumberFormat().format(fruit.price) + " ₫"}
                          </p>
                          <p className="text-red-500 font-bold text-xs">
                            {"-" + 10 + "%"}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })
              : null}
          </div>
          {totalItems >= 20 ? (
            <div className="flex items-center justify-center text-center mt-6">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(totalItems / 20)}
                layout="pagination"
                onPageChange={(e: any) => {
                  setPage(e);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
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
