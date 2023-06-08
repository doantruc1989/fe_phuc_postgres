import { Breadcrumb, Rating } from "flowbite-react";
import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import axios from "../../other/axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

function Index() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([] as any);
  const { t } = useTranslation("");

  useEffect(() => {
    let language = router.locale;
    try {
      axios
        .get(
          `/blog?lang=${
            language === "default" ? "en" : language === "ja" ? "ja" : "en"
          }`
        )
        .then((res: any) => {
          setBlogs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [router]);
  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={
            router.locale === "en"
              ? "/en"
              : router.locale === "ja"
              ? "/ja"
              : "/"
          }
          icon={HiHome}
        >
          {t("Trang chủ")}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t("Tin Tức")}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="w-full md:w-11/12 lg:w-9/12 mx-auto mt-6">
        <h1 className="font-medium uppercase">{t("Tin Tức")}</h1>

        <div className="grid lg:grid-cols-4 gap-2 grid-cols-2 md:grid-cols-3 my-3 pb-6">
          {blogs.map((item: any) => {
            return (
              <div
                key={item?.id}
                className="rounded-md border border-gray-200 shadow-sm hover:shadow-xl bg-white"
              >
                <Link
                  href={
                    router.locale === "en"
                      ? `/en/blog/${item?.blog?.id}`
                      : router.locale === "ja"
                      ? `/ja/blog/${item?.blog?.id}`
                      : `/blog/${item?.blog?.id}`
                  }
                >
                  <img
                    src={item?.blog?.image}
                    className="rounded-t-md cursor-pointer w-full h-60"
                    alt="..."
                  />
                  <div className="cursor-pointer text-center text-xs">
                    <p className="font-medium text-base md:text-lg  text-gray-900 dark:text-white mx-1 mt-2 text-ellipsis h-[70px] md:h-16 lg:h-20">
                      {router.locale === "default"
                        ? item?.blog?.title.substring(0, 40)
                        : item?.transTitle.substring(0, 30)}
                    </p>
                  </div>
                  <div className="mx-2 my-2">
                    {router.locale === "default"
                      ? parse(`${item?.blog?.text.substring(0, 100)}...`)
                      : parse(`${item?.transText.substring(0, 100)}...`)}
                  </div>
                </Link>
              </div>
            );
          })}
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
