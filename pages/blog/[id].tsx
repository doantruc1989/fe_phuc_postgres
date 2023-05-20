import { Breadcrumb, Rating } from "flowbite-react";
import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";
import { HiHome, HiOutlineShoppingBag } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { GetStaticPaths, GetStaticProps } from "next";

function Index({ data }: any) {
  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href={"/blog"}
          icon={HiOutlineShoppingBag}
          className="capitalize"
        >
          Tin Tức
        </Breadcrumb.Item>
        <Breadcrumb.Item className="hidden md:flex">
          {data?.title}
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="w-full md:w-11/12 lg:w-9/12 mx-auto mt-10 mb-6">
        <h1 className="font-medium text-center text-xl"> {data?.title}</h1>
        <div className="flex flex-col w-9/12 mx-auto mt-10">
          <img src={data?.image} alt="" />
        </div>
        <div className="text-justify mt-6 leading-loose mx-3 md:mx-0">
          {parse(`${data?.text}`)}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { params }: any = context;
  const response = await axios.get(`http://localhost:3007/blog/${params.id}`);
  const data = response.data;

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`http://localhost:3007/blog`);
  const resData = res.data;

  const paths = resData.map((item: any) => {
    return {
      params: { id: `${item.id}` },
    };
  });
  // const paths = [{params: {id: '2'}}]

  return {
    paths: paths,
    // paths: { params: { id: "1" } },
    fallback: true,
  };
};

export default Index;
