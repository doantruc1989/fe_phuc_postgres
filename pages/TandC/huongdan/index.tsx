import { Breadcrumb } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import { CartProvider } from "react-use-cart";
import Layout from "../../components/Layout";

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
        <Breadcrumb.Item>{t("Hướng dẫn")}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-full lg:w-11/12 mx-auto my-10 leading-loose text-justify px-2">
        <h1 className="font-medium text-xl mb-3">{t("Hướng dẫn")}</h1>
        <div>
          <span className="font-medium">{t("Bước ")}1: </span>
          {t("Truy cập website và lựa chọn sản phẩm cần mua để mua hàng")}
        </div>
        <div>
          <span className="font-medium">{t("Bước ")}2: </span>
          {t(
            "Click vào sản phẩm muốn mua, màn hình hiển thị ra pop up với các lựa chọn sau"
          )}
        </div>
        <p className="indent-8">
          -{" "}
          {t(
            "Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục mua hàng để lựa chọn thêm sản phẩm vào giỏ hàng"
          )}
        </p>
        <p className="indent-8">
          -{" "}
          {t(
            "Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem giỏ hàng"
          )}
        </p>
        <p className="indent-8">
          -{" "}
          {t(
            "Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng bấm vào: Đặt hàng và thanh toán"
          )}
        </p>
        <div>
          <span className="font-medium">{t("Bước ")}3: </span>
          {t("Lựa chọn thông tin tài khoản thanh toán")}
        </div>
        <p className="indent-8">
          {t(
            "- Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là email và mật khẩu vào mục đã có tài khoản trên hệ thống"
          )}
        </p>
        <p className="indent-8">
          {t(
            "- Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng điền các thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi có tài khoản bạn sẽ dễ dàng theo dõi được đơn hàng của mình"
          )}
        </p>
        <p className="indent-8">
          {t(
            "- Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp chuột vào mục đặt hàng không cần tài khoản"
          )}
        </p>
        <div>
          <span className="font-medium">{t("Bước ")}4: </span>
          {t(
            "Điền các thông tin của bạn để nhận đơn hàng, lựa chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình"
          )}
        </div>
        <div>
          <span className="font-medium">{t("Bước ")}5: </span>
          {t("Xem lại thông tin đặt hàng, điền chú thích và gửi đơn hàng")}
        </div>
        <p className="indent-8">
          {t(
            "Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách gọi điện lại để xác nhận lại đơn hàng và địa chỉ của bạn."
          )}
        </p>
        <p className="text-center font-medium mt-3">
          {t("Trân trọng cảm ơn.")}
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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Index;
