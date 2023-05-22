import { Breadcrumb } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";

function Index() {
  const router = useRouter();
  const { t } = useTranslation("");
  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en" : "/"}
          icon={HiHome}
        >
          {t("Trang chủ")}
        </Breadcrumb.Item>
        <Breadcrumb.Item className="capitalize">{t("Tin Tức")}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-full md:w-11/12 lg:w-9/12 mx-auto mt-10 mb-6 leading-loose text-justify">
        <h1 className="font-medium text-lg">
          {t("CHƯƠNG TRÌNH KHUYẾN MÃI RỦ BẠN CÙNG MUA")}
        </h1>
        <p>
          {t("Xin kính chào quý khách. Hoan hỉ chào đón tháng 12 - Mùa Lễ Hội, nhà Phúc tung chương trình ưu đãi mới:")}
        </p>
        <div>
          <p className="normal-case font-medium">{t("Rủ bạn cùng mua")}</p>
          <p className="font-medium">{t("𝗖𝘂̀𝗻𝗴 mua- Cùng vui")}</p>
        </div>
        <p>
           {t("Chỉ cần giới thiệu cho shop một khách hàng mới (chưa có trong hệ thống thông tin khách hàng nhà Phuc Fresh), sẽ cùng nhận voucher cho đơn hàng tiếp theo")} 💕
        </p>
        <p>--------------</p>
        <p>{t("Tham khảo mẫu sẵn có tại:")}</p>
        <a href="https://phucfresh.vn/hop-qua-trai-cay">
          https://phucfresh.vn/hop-qua-trai-cay
        </a>
        <p>{t("Hoặc liên hệ để được tư vấn thêm:")}</p>
        <p>--------------</p>
        <p className="font-bold">Phuc Fresh - All for your health</p>
        <p>
          {t("Trái Cây Nhập Khẩu, Trái Cây Việt Nam Chọn Lọc, Quà Tặng Trái Cây, Thực Phẩm Sạch.")}
        </p>
        <p>Hotline: 0949 119 338</p>
        <p>--------------</p>
        <p>🏠25 {t("Lam Sơn, Linh Tây, Thủ Đức, TP.HCM")}</p>
        <p>☎0983803650</p>
        <p>🏠74 {t("Nguyễn Quang Bích, P13, Tân Bình, TP. HCM")}</p>
        <p>☎0779199986</p>
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
