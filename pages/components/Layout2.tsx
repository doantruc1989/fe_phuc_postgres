import React from "react";
import Footera from "./Footer";
import HeadSeo from "./HeadSeo";

const Layout2 = ({ children }: { children: React.ReactNode }) => {
  const prop = {
    title: "tiki trang chủ home page tìm kiếm sản phẩm sales off giá rẻ",
    keywords: "tiki trang chủ home page tìm kiếm sản phẩm sales off giá rẻ",
    description: "tiki làm trang trang chủ home page tìm kiếm sản phẩm sales off giá rẻ đơn giản easy",
  }
  return (
    <React.Fragment>
      <HeadSeo prop={prop}/>
        <main className="w-full mx-auto bg-[#F5F5FA]">{children}</main>
      <Footera />
    </React.Fragment>
  );
};

export default Layout2;
