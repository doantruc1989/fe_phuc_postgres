import { Breadcrumb } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { HiHome } from "react-icons/hi";
import { CartProvider } from "react-use-cart";
import Layout from "../../components/Layout";

function Index() {
  const router = useRouter();
  return (
    <div>
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={router.locale === "en" ? "/en" : "/"}
          icon={HiHome}
        >
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chính sách đổi trả</Breadcrumb.Item>
      </Breadcrumb>
      <div className="w-full lg:w-11/12 mx-auto my-10 leading-loose text-justify px-2">
        <h1 className="font-medium text-xl mb-3">Chính sách đổi trả</h1>
        <p className="italic indent-8">
          Khi mua hàng tại PHUC FRESH trong thời gian 24h kể từ khi nhận hàng,
          bạn được chấp nhận đổi lại sản phẩm hoặc đổi lấy sản phẩm giá trị cao
          hơn (trả thêm phần tiền chênh lệch). Tuy nhiên, trước khi tiến hành
          đổi, bạn cần lưu ý những yêu cầu cụ thể sau:{" "}
        </p>
        <p className="indent-12">- Điều kiện đổi hàng.</p>
        <p className="indent-12">- Cách thức đổi hàng.</p>
        <p className="indent-12">- Các chi phí liên quan đến việc đổi hàng.</p>
        <p className="indent-12">- Đóng gói gửi sản phẩm về cho PHUC FRESH.</p>
        <p className="indent-12">- Thời gian đổi hàng.</p>
        <p className="font-medium indent-8">
          Bước 1: Kiểm tra điều kiện đổi hàng
        </p>
        <p className="indent-12">
          Sản phẩm đủ điều kiện đổi trả là sản phẩm thỏa mãn các điều kiện sau
          và không thuộc danh sách sản phẩm không được đổi trả
        </p>
        <p className="font-medium indent-8">Điều kiện:</p>
        <p className="indent-12">
          - Sản phẩm đổi trả trong vòng 24h (xác nhận bằng hoá đơn mua hàng) kể
          từ ngày nhận hàng.
        </p>
        <p className="indent-12">
          - Sản phẩm còn trong tình trạng ban đầu khi nhận hàng, còn nguyên vẹn
          tem mạc, phụ kiện đi kèm (hộp, túi phụ…).
        </p>
        <p className="indent-12">- Quà khuyến mãi có giá trị (nếu có).</p>
        <p className="indent-12">
          - Sản phẩm không bị dơ bẩn, bễ vỡ, hư hỏng, dính bẩn, trầy xước, có
          mùi lạ.
        </p>
        <p className="indent-12">
          - Sản phẩm chưa qua sử dụng, còn nguyên đầy đủ phụ kiện.
        </p>
        <p className="indent-12">
          - Sản phẩm còn trong bao bì có dán mã sản phẩm.
        </p>
        <p className="indent-12">
          - Sản phẩm bị giao sai, thiếu phụ kiện, thiếu hàng.
        </p>
        <p className="indent-12">
          - Sản phẩm bị vỡ hỏng trong quá trình vận chuyển tới khách hàng.
        </p>
        <p className="indent-12">- Sản phẩm lỗi kỹ thuật do nhà sản xuất.</p>
        <p className="indent-12">
          - Sản phẩm chuyển nhầm hàng, nhầm chủng loại mà khách hàng đặt.
        </p>
        <p className="indent-12">
          - Hàng đổi lại phải có giá trị lớn hơn hoặc bằng sản phẩm cần đổi.
          Trong trường hợp chuyển sai sản phẩm, FARMERS’ MARKET sẽ giao lại hàng
          miễn phí.
        </p>
        <p className="indent-12">
          - Mỗi sản phẩm chỉ có thể đổi trả hàng 1 lần.
        </p>
        <p className="indent-12">
          - Không đổi trả thực phẩm tươi, đông lạnh khi không xảy ra lỗi chất
          lượng từ nhà sản xuất.
        </p>
        <p className="font-medium indent-8">
          Sản phẩm không được đổi trả bao gồm:
        </p>
        <p className="indent-12">
          - Các sản phẩm trong chương trình giảm giá, khuyến mãi mà không áp
          dụng chính sách đổi trả hàng.
        </p>
        <p className="font-medium indent-8">Bước 2: Hình thức đổi hàng</p>
        <p className="italic indent-8">
          Để tiến hành đổi sản phẩm, bạn vui lòng thực hiện 2 bước đơn giản sau:
        </p>
        <p className="indent-8">
          1. Liên hệ với PHUC FRESH qua Hotline 0949.119.338 để kiểm tra điều
          kiện sản phẩm và điều kiện đổi để đảm bảo sản phẩm đáp ứng các điều
          kiện này.
        </p>
        <p className="indent-8">
          2. Lựa chọn hình thức đổi hàng: Mang đến trực tiếp hoặc nhân viên đổi
          trả tại địa điểm của khách hoặc gửi vận chuyển hàng hoá.
        </p>
        <p className="indent-12">
          - Nếu mang đến trực tiếp, bạn chỉ cần mang sản phẩm và chứng từ khi
          nhận hàng (hoá đơn bán hàng/ phiếu xuất kho/ hoá đơn đỏ) đến hệ thống
          cửa hàng của PHUC FRESH.{" "}
        </p>
        <p className="indent-12">
          - Nếu gửi bằng dịch vụ giao hang hoá, bạn cần lưu ý xác nhận với bên
          chuyển phát tình trạng của hàng hóa: còn nguyên tem niêm phong, nguyên
          vỏ hộp, sản phẩm còn nguyên vẹn không bị vỡ hay hỏng hóc, sản phẩm còn
          đủ phụ kiện và đảm bảo điều kiện bảo quản hàng hoá trong quá trình vận
          chuyển.
        </p>
        <p className="indent-8">
          Nếu sản phẩm đổi thỏa các điều kiện đổi hàng, chúng tôi sẽ đổi sản
          phẩm mới cho bạn ngay tại cửa hàng. Hoặc sẽ giao đến địa điểm của bạn
          theo yêu cầu trong thời gian 3 ngày kể từ ngày nhận được sản phẩm &
          yêu cầu đổi trả.
        </p>
        <p className="font-medium indent-8">
          Bước 3: Các chi phí liên quan đến việc đổi hàng
        </p>
        <p className="italic indent-8">
          Một số khoản phí bạn cần chịu khi đổi hàng như sau:
        </p>
        <p className="indent-12">
          - Chi phí vận chuyển hang hoá: Nếu việc đổi trả hàng hoá do ý kiến chủ
          quan của bạn, mà không phải do lỗi sản phẩm. Bạn sẽ phải chịu toàn bộ
          chi phí cho việc chuyển sản phẩm đó tới PHUC FRESH & vận chuyển sản
          phẩm mới đến địa điểm của bạn.{" "}
        </p>
        <p className="indent-12">
          - Trường hợp bạn gửi sản phẩm không đạt điều kiện đổi trả hàng cho
          PHUC FRESH, bạn sẽ phải chịu chi phí để chúng tôi gửi trả lại sản phẩm
        </p>
        <p className="indent-12">
          - Trong trường hợp, việc đổi trả sản phẩm do lỗi chất lượng sản phẩm,
          sai đơn hàng, PHUC FRESH sẽ chịu hoàn toàn chi phí vận chuyển đổi trả.
        </p>
        <p className="font-medium indent-8">
          Bước 4: Đóng gói gửi sản phẩm về cho PHUC FRESH
        </p>
        <p className="indent-12">
          - Bạn vui lòng đóng gói sản phẩm hoàn trả và hoá đơn mua hàng đến hệ
          thống cửa hàng PHUC FRESH:
        </p>
        <p className="indent-12">
          Chung cư 4S Linh Đông, Đường số 30, Phường Linh Đông, Quận Thủ Đức,
          HCM
        </p>
        <p className="indent-12">
          Thời gian PHUC FRESH nhận được hàng không quá 24 giờ kể từ lúc giao
          hàng thành công – đối với sản phẩm tươi, đông lạnh; không quá 48 giờ
          kể từ lúc giao hang thành công – đối với sản phẩm thực phẩm khô.
        </p>
        <p className="indent-12">
          Chính sách đổi hàng này có thể thay đổi mà không cần báo trước do các
          điều kiện về tiêu chuẩn hàng hóa. Vì vậy, bạn vui lòng thường xuyên
          cập nhật thông tin tại trang web của PHUC FRESH
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
