import { Breadcrumb } from "flowbite-react";
import React, { ReactElement } from "react";
import { HiHome } from "react-icons/hi";
import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";

function Index() {
  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item className="capitalize">Tin Tức</Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-full md:w-11/12 lg:w-9/12 mx-auto mt-10 mb-6 leading-loose text-justify">
        <h1 className="font-medium text-lg">CHƯƠNG TRÌNH KHUYẾN MÃI RỦ BẠN CÙNG MUA</h1>
        <p>
          Xin kính chào quý khách. Hoan hỉ chào đón tháng 12 - Mùa Lễ Hội, nhà
          Phúc tung chương trình ưu đãi mới:
        </p>
        <div>
          <p className="normal-case font-medium">Rủ bạn cùng mua</p>
          <p className="font-medium"> 𝗖𝘂̀𝗻𝗴 mua- Cùng vui</p>
        </div>
        <p>
          Chỉ cần giới thiệu cho shop một khách hàng mới (chưa có trong hệ thống
          thông tin khách hàng nhà Phuc Fresh), sẽ cùng nhận voucher cho đơn
          hàng tiếp theo 💕
        </p>
        <p>--------------</p>
        <p>Tham khảo mẫu sẵn có tại:</p>
        <a href="https://phucfresh.vn/hop-qua-trai-cay">
          https://phucfresh.vn/hop-qua-trai-cay
        </a>
        <p>Hoặc liên hệ để được tư vấn thêm:</p>
        <p>--------------</p>
        <p className="font-bold">Phuc Fresh - All for your health</p>
        <p>
          Trái Cây Nhập Khẩu, Trái Cây Việt Nam Chọn Lọc, Quà Tặng Trái Cây,
          Thực Phẩm Sạch.
        </p>
        <p>Hotline: 0949 119 338</p>
        <p>--------------</p>
        <p>🏠25 Lam Sơn, Linh Tây, Thủ Đức, TP.HCM </p>
        <p>☎0983803650</p>
        <p>🏠74 Nguyễn Quang Bích, P13, Tân Bình, TP. HCM</p>
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

export default Index;
