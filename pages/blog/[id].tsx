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
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

function Index(data:any) {
  const [blog, setBlog] = useState([] as any);
  const router = useRouter();
  const blogId = router.query.id;
  const { t } = useTranslation("common");

  // useEffect(() => {
  //   let language = router.locale;
  //   try {
  //     axios
  //       .get(
  //         `/blog/${blogId}?lang=${
  //           language === "default" ? "en" : language === "ja" ? "ja" : "en"
  //         }`
  //       )
  //       .then((res: any) => {
  //         setBlog(res.data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [router]);

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
        <Breadcrumb.Item
          href={
            router.locale === "en"
              ? "/en/blog"
              : router.locale === "ja"
              ? "/ja/blog"
              : "/blog"
          }
          icon={HiOutlineShoppingBag}
          className="capitalize"
        >
          {t("Tin Tức")}
        </Breadcrumb.Item>
        <Breadcrumb.Item className="hidden md:flex">
          {router.locale === "default" ? data?.data?.blog?.title : data?.transTitle}
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="w-full md:w-11/12 lg:w-9/12 mx-auto mt-10 mb-6">
        <h1 className="font-medium text-center text-xl">
          {router.locale === "default" ? data?.data?.blog?.title : data?.data?.transTitle}
        </h1>
        <div className="flex flex-col w-9/12 mx-auto mt-10">
          <img src={data?.data?.blog?.image} alt="" />
        </div>
        <div className="text-justify mt-6 leading-loose mx-3 md:mx-0">
          {router.locale === "default"
            ? parse(`${data?.data?.blog?.text}`)
            : parse(`${data?.data?.transText}`)}
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

export const getServerSideProps = async (
  context :
 any) => {
  const response = await axios.get(`/blog/${context.params.id}?lang=${context.locale === "default" ? "en" : context.locale === "ja" ? "ja" : "en"}`);
  const data = response.data;

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: { 
      ...(await serverSideTranslations(context.locale, ["common"])), data
      },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = [{params: {id: '2'}}]

//   return {
//     paths: paths,
//     fallback: true,
//   };
// };

// export const getServerSideProps: GetServerSideProps = async ({
//   locale,
// }: any) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// };

export default Index;
