import React, { useEffect, useState } from "react";
import HeadSeo from "./HeadSeo";
import Footera from "./Footer";
import TopBar from "./TopBar";
import { Sidebar } from "primereact/sidebar";
import Link from "next/link";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import SidebarComp from "./SidebarComp";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("");

  const prop = {
    title: "PhucFresh trái cây tươi",
    keywords: "trai cay nhap khau tuoi xanh ngot nho xoai cam buoi vietgap",
    description:
      "trai cay tuoi xanh sach ho chi minh sai gon",
  };
  return (
    <React.Fragment>
      <HeadSeo prop={prop} />
      <TopBar visible={visible} setVisible={setVisible} />
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div className="w-full">
            <div className="flex flex-col items-center">
              <img
                className="w-14 h-14 rounded-full"
                src="/image/logo.png"
                alt="logo"
              />
              <div className="flex justify-around gap-10 mt-3 font-medium w-full py-3">
                <Link
                  className="hover:bg-green-100 px-3 py-2 rounded-lg"
                  href={"/login"}
                >
                  {t("Đăng nhập")}
                </Link>
                <Link
                  className="hover:bg-green-100 px-3 py-2 rounded-lg"
                  href={"/register"}
                >
                  {t("Đăng ký")}
                </Link>
              </div>
            </div>
            <div className="w-full mx-auto">
              <SidebarComp />
            </div>
          </div>
        </Sidebar>
      </div>
      <main>{children}</main>
      <Footera />
    </React.Fragment>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Layout;
