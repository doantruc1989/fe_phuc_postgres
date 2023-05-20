import { Breadcrumb } from "flowbite-react";
import React, { ReactElement } from "react";
import { HiHome } from "react-icons/hi";
import { CartProvider } from "react-use-cart";
import Layout from "../../components/Layout";

function Index() {
  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thanh toán</Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-full lg:w-11/12 mx-auto my-10 leading-loose text-justify px-2">
        <h1 className="font-medium text-xl mb-3">Thanh toán</h1>
        <div>
          <span className="font-bold capitalize text-green-700">
            HƯỚNG DẪN ĐẶT HÀNG VÀ THANH TOÁN
          </span>
        </div>

        <p className="italic">
          Quí khách vui lòng đến cửa hàng Phuc Fresh để trực tiếp chọn lựa sản
          phẩm ưng ý và thanh toán ngay tại quầy. Hoặc quí khách có thế không
          đến cửa hàng và đặt hàng với chúng tôi qua số điện thoại hotline của
          cửa hàng <span className="font-medium">0949119338</span>, hoặc liên hệ
          đặt hàng với chúng tôi qua địa chỉ web http://www.phucfresh.vn/ hay
          địa chỉ trang Fanpage Facebook của chúng tôi
          http://facebook.com/phucfresh và thanh toán ngay sau khi nhận hàng tại
          nhà.
        </p>
        <p className="font-bold text-green-700">
          1. Thanh toán trực tiếp tại cửa hàng Phuc Fresh
        </p>
        <p className="indent-8">
          Quí khách vui lòng đến cửa hàng Phuc Fresh để trực tiếp chọn lựa sản
          phẩm ưng ý và thanh toán ngay tại cửa hàng.
        </p>
        <p className="font-bold text-green-700">2. Thanh toán tại nhà</p>
        <p className="indent-8">
          Quí khách có thế không đến cửa hàng và đặt hàng với chúng tôi qua số
          điện thoại hotline của cửa hàng{" "}
          <span className="font-medium">0949119338</span>, hoặc liên hệ đặt hàng
          với chúng tôi qua địa chỉ web{" "}
          <span className="font-medium">http://www.phucfresh.vn/</span> hay địa
          chỉ trang Fanpage Facebook của chúng tôi{" "}
          <span className="font-medium">http://facebook.com/phucfresh</span> và
          thanh toán ngay sau khi nhận hàng tại nhà.
        </p>
        <p className="font-bold text-green-700">3. Thanh toán qua ngân hàng</p>
        <p className="indent-8">
          Quí khách chọn hình thức đặt hàng từ xa qua điện thoại hay đặt hàng
          online (theo các kênh thông tin chúng tôi đã nêu bên trên) và thanh
          toán bằng cách chuyển khoản qua ngân hàng trước cho chúng tôi để chúng
          tôi giao hàng đúng hẹn tại đúng địa chỉ như đã cam kết, Về thủ tục
          chuyển khoản, quí khách thực hiện thao tác như sau: Nhắn tin cho số
          hotline <span className="font-medium">0949119338</span> với nội dung: Thanh toán cho đơn hàng #... - Tên
          sản phẩm...- Thông qua ngân hàng... - Số tiền...
        </p>
        <p className="indent-8">Thông tin tài khoản:</p>
        <p className="indent-8">Ngân hàng Vietcombank</p>
        <p className="indent-8">STK: <span className="font-medium">0201000225200</span></p>
        <p className="indent-8">CN Ha Tinh</p>
        <p className="indent-8">Chủ tài khoản: LE THI PHUC</p>
        <p className="indent-8">Nhân viên Phuc Fresh nhận được tiền sẽ liên hệ lại cho khách hàng và bắt đầu đặt đơn hàng.</p>
        <p className="indent-8">Nếu trong vòng 12h quí khách không nhận được liên hệ lại thì vui lòng gửi mail đến địa chỉ: <span className="font-medium">hotro@phucfresh.vn</span> hoặc gọi điện số hotline <span className="font-medium">0949119338</span> để chúng tôi xác nhận lại với ngân hàng.</p>
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
