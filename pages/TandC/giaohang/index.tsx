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
        <Breadcrumb.Item>Chính sách giao hàng</Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-full lg:w-11/12 mx-auto my-10 leading-loose text-justify px-2">
        <h1 className="font-medium text-xl mb-3">Chính sách giao hàng</h1>
        <p className="font-medium">1- Mục đích và phạm vi thu thập thông tin</p>
        <p className="indent-8">
          Phuc Fresh không bán, chia sẻ hay trao đổi thông tin cá nhân của khách
          hàng thu thập trên trang web cho một bên thứ ba nào khác.
        </p>
        <p className="indent-8">
          Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ cửa
          hàng.
        </p>
        <p className="indent-8">
          Khi quý khách cung cấp thông tin cho chúng tôi, thông tin cá nhân mà
          chúng tôi thu thập bao gồm:
        </p>
        <p className="indent-12">- Tên Khách hàng</p>
        <p className="indent-12">- Địa chỉ Email</p>
        <p className="indent-12">- Số điện thoại</p>
        <p className="indent-12">- Địa chỉ giao hàng</p>
        <p className="indent-12">- Tên người nhận</p>
        <p className="indent-8">
          Những thông tin trên sẽ được sử dụng cho một hoặc tất cả các mục đích
          sau đây:
        </p>
        <p className="indent-12">
          - Giao hàng cho quý khách đã mua tại Phuc Fresh
        </p>
        <p className="indent-12">
          - Thông báo về việc giao hàng và hỗ trợ khách hàng
        </p>
        <p className="indent-12">- Cung cấp thông tin liên quan đến sản phẩm</p>
        <p className="indent-12">
          - Xử lý đơn đặt hàng và cung cấp dịch vụ của chúng tôi theo yêu cầu
          của quý khách.
        </p>
        <p className="font-medium">2- Phạm vi sử dụng thông tin</p>
        <p className="indent-12">
          Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ cửa
          hàng . Chúng tôi có thể chia sẻ tên và địa chỉ của quý khách cho dịch
          vụ chuyển phát nhanh hoặc nhà cung cấp của chúng tôi để có thể giao
          hàng cho quý khách.
        </p>
        <p className="font-medium">3- Thời gian lưu trữ thông tin</p>
        <p className="indent-12">
          Chúng tôi lưu trữ thông tin là 2 năm (dữ liệu máy tính).
        </p>
        <p className="indent-12">
          Đối với thông tin cá nhân chúng tôi chỉ xóa đi dữ liệu này nếu khách
          hàng có yêu cầu.
        </p>
        <p className="font-medium">
          4- Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân :
        </p>
        <p className="indent-12">Hộ kinh doanh Phuc Fresh</p>
        <p className="indent-12">
          25 Lam Sơn, Phường Linh Tây, Quận Thủ Đức, TP. Hồ Chí Minh
        </p>
        <p className="indent-12">MST : 8299134516</p>
        <p className="indent-12">Điện thoại : 0949119338</p>
        <p className="font-medium">
          5- Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu
          cá nhân của mình{" "}
        </p>
        <p className="indent-12">
          Người dùng có thể đăng nhập vào tài khoản cá nhân của mình trên
          website phucfresh.vn và dùng chức năng “Chỉnh sửa” để điều chỉnh hoặc
          xóa đi dữ liệu cá nhân của mình. Hoặc có thể liên hệ trực tiếp PHUC
          FRESH để chỉnh sửa hoặc xóa
        </p>
        <p className="font-medium">
          6- Cam kết bảo mật thông tin cá nhân khách hàng:
        </p>
        <p className="indent-12">
          Tại Phuc Fresh, sự riêng tư của khách truy cập của chúng tôi là cực kỳ
          quan trọng.
        </p>
        <p className="indent-12">
          Chúng tôi sẽ không chia sẻ thông tin của quý khách cho bất kỳ một công
          ty nào khác ngoại trừ những công ty và các bên thứ ba có liên quan
          trực tiếp đến việc giao hàng mà quý khách đã mua tại Phuc Fresh. Trong
          một vài trường hợp đặc biệt, www.phucfresh.vn có thể bị yêu cầu phải
          tiết lộ thông tin cá nhân, ví dụ như khi có căn cứ cho việc tiết lộ
          thông tin là cần thiết để ngăn chặn các mối đe dọa về tính mạng và sức
          khỏe, hay cho mục đích thực thi pháp luật. www.phucfresh.vn cam kết
          tuân thủ Đạo luật Bảo Mật và các Nguyên tắc Bảo mật Quốc gia.
        </p>
        <p className="indent-12">
          Nếu quý khách tin rằng bảo mật của quý khách bị https://phucfresh.vn/​
          xâm phạm, xin vui lòng liên hệ với chúng tôi tại địa chỉ
          hotro@phucfesh.vn để được giải quyết vấn đề.
        </p>
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
