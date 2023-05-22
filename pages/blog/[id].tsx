import { Breadcrumb, Rating } from "flowbite-react";
import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";
import { HiHome, HiOutlineShoppingBag } from "react-icons/hi";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import axios from "../../other/axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

function Index() {
  const [blog, setBlog] = useState([] as any);
  const router = useRouter();
  const blogId = router.query.id;
  const { t } = useTranslation("");

  useEffect(() => {
    try {
      axios.get(`/blog/${blogId}`).then((res: any) => {
        setBlog(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [blogId]);

  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en" : "/"}
          icon={HiHome}
        >
          {t("Trang chủ")}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en/blog" : "/blog"}
          icon={HiOutlineShoppingBag}
          className="capitalize"
        >
          {t("Tin Tức")}
        </Breadcrumb.Item>
        <Breadcrumb.Item className="hidden md:flex">
          {router.locale === "en" ? blog?.blogEn?.enTitle : blog?.title}
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="w-full md:w-11/12 lg:w-9/12 mx-auto mt-10 mb-6">
        <h1 className="font-medium text-center text-xl">
          {" "}
          {router.locale === "en" ? blog?.blogEn?.enTitle : blog?.title}
        </h1>
        <div className="flex flex-col w-9/12 mx-auto mt-10">
          <img src={blog?.image} alt="" />
        </div>
        <div className="text-justify mt-6 leading-loose mx-3 md:mx-0">
          {router.locale === "en"
            ? parse(`${blog?.blogEn?.enText}`)
            : parse(`${blog?.text}`)}
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

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Index;
