import { Dialog, Transition } from "@headlessui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HiMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
} from "react-icons/hi";

const Footera = () => {
  const [subscribe, setSubscribe] = useState(false);
  const { t } = useTranslation('');
  const router =useRouter()
  return (
    <div>
      <div className=" bg-[#f9c938] py-4 px-3 text-[#222]">
        <div className="flex flex-col content-center gap-6 md:flex-row md:justify-between items-center w-11/12 mx-auto lg:w-9/12">
          <div className="flex items-center w-full gap-4">
            <div className="p-4 rounded-full bg-white">
              <HiMail className="text-[#222] text-3xl" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <h1 className="font-medium text-2xl">{t("ĐĂNG KÝ NHẬN TIN")}</h1>
              <p>{t("Hãy nhận ưu đãi hấp dẫn từ Phuc Fresh nào!")}</p>
            </div>
          </div>

          <div className="w-full">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                 {t("Đăng ký")}
              </label>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder={router.locale == 'default' ? "Vui lòng nhập email của bạn" : router.locale == 'en' ? "Please enter your email" : "メールアドレスを入力してください"}
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={(e: any) => {
                    setSubscribe(!subscribe);
                  }}
                >
                   {t("Đăng ký")}
                </button>
              </div>
            </form>
          </div>

          <Transition appear show={subscribe} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setSubscribe(!subscribe)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <p className="w-full text-center my-2">{t("Cám ơn bạn đã đăng ký nhận tin từ phucfresh.vn")}</p>
                      <p className="w-full text-center my-2">{t("Chúng tôi sẽ gửi mail đến bạn khi có khuyến mãi và thông tin mới nhất")}</p>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-justify mt-8 pb-8 w-11/12 mx-auto lg:w-9/12">
        <div>
          <h1 className="font-medium mb-3">{t("THÔNG TIN LIÊN HỆ")}</h1>
          <div>
            <div className="flex gap-3 items-center mb-1">
              <div>
                <HiOutlineLocationMarker />
              </div>
              <p>
                {t("Địa chỉ: CN1: 25 Lam Sơn, Phường Linh Tây, Quận Thủ Đức, TP. Hồ Chí Minh CN2: 74 Nguyễn Quang Bích, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh")}
              </p>
            </div>
            <div className="flex gap-3 items-center mb-1">
              <div>
                <HiOutlinePhone />
              </div>
              <p>{t("Điện thoại")}: 0949 119 338</p>
            </div>
            <div className="flex gap-3 items-center">
              <div>
                <HiMail />
              </div>
              <p>Email: sale@phucfresh.vn</p>
            </div>
          </div>

          <p className="mt-3">{t("Hộ kinh doanh Phuc Fresh")}</p>
          <p className="mt-3">{t("MST")}: 8299134516</p>
          <p className="mt-3">
          {t("Giấy ĐKKD số : 41Q8030390 Ngày cấp: ")}28/09/2020
          </p>

          <div className="flex gap-3 items-center justify-start mt-3">
            <img
              className="w-12 h-12 rounded-full"
              src="/image/twitter.png"
              alt="twitter"
            />
            <Link href={"https://www.facebook.com/phucfresh"}>
              <img
                className="w-12 h-12 rounded-full"
                src="/image/facebook.jpg"
                alt="facebook"
              />
            </Link>
            <img
              className="w-12 h-12 rounded-full"
              src="/image/instagram.jpg"
              alt="instagram"
            />
            <img
              className="w-12 h-12 rounded-full"
              src="/image/youtube.jpg"
              alt="youtube"
            />
          </div>
        </div>

        <div>
          <div>
            <h1 className="font-medium">{t("HƯỚNG DẪN VÀ CHÍNH SÁCH")}</h1>
            <div className="flex flex-col items-start my-3 gap-2">
              <Link href={"/TandC/huongdan"}>{t("Hướng dẫn mua hàng")}</Link>
              <Link href={"/TandC/dieukhoan"}>{t("Điều khoản dịch vụ")}</Link>
              <Link href={"/TandC/thanhtoan"}>{t("Hướng dẫn thanh toán")}</Link>
              <Link href={"/TandC/chinhsach"}>{t("Chính sách bảo mật thông tin")}</Link>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-medium mb-3">{t("ĐƠN VỊ VẬN CHUYỂN")}</h1>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <img
                className="border border-black rounded-md"
                src="/image/grab.png"
                alt="grab"
              />
              <img
                className="border border-black rounded-md"
                src="/image/vietnampost.png"
                alt="vietnampost"
              />
              <img
                className="border border-black rounded-md"
                src="/image/best.png"
                alt="best"
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            <h1 className="font-medium">{t("HỖ TRỢ KHÁCH HÀNG")}</h1>
            <div className="flex flex-col items-start my-3 gap-2">
              <Link href={"/TandC/doitra"}>{t("Chính sách đổi trả")}</Link>
              <Link href={"/TandC/giaohang"}>{t("Chính sách giao hàng")}</Link>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-medium">{t("PHƯƠNG THỨC THANH TOÁN")}</h1>
            <div className="grid grid-cols-4 md:grid-cols-3 gap-3 mt-3">
              <img
                className="border border-black rounded-md"
                src="/image/visa.png"
                alt="visa"
              />
              <img
                className="border border-black rounded-md"
                src="/image/mastercard.png"
                alt="mastercard"
              />
              <img
                className="border border-black rounded-md"
                src="/image/jcb.png"
                alt="jcb"
              />
              <img
                className="border border-black rounded-md"
                src="/image/momo.png"
                alt="momo"
              />
            </div>
            <img
              className="h-14 w-auto mt-3"
              src="/image/bocongthuong.png"
              alt="bocongthuong"
            />
          </div>
        </div>
      </div>
      <p className="text-center py-2 border-t">
        © {t("Bản quyền thuộc về Phuc Fresh")}
      </p>
    </div>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Footera;
