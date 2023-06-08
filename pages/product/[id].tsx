import { Breadcrumb, Button, Rating, Tabs, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { HiHome, HiOutlineShoppingBag, HiPhone } from "react-icons/hi";
import { CartProvider, useCart } from "react-use-cart";
import Layout from "../components/Layout";
import Relativeproducts from "./Relativeproducts";
import Slider from "react-slick";
import parse from "html-react-parser";
import { ScrollTop } from "primereact/scrolltop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import axios from "../../other/axios";
import { GetServerSideProps } from "next";
import ImageViewer from "../components/ImageViewer";
import useOnScreen from "../../other/useOnScreen";

function Index() {
  const [fruit, setFruit] = useState([] as any);
  const [category, setCategory] = useState([] as any);
  const router = useRouter();
  const fruitId = router.query.id;
  const [blogs, setBlogs] = useState([] as any);
  const [image, setImage] = useState([] as any);
  const [url, setUrl] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const modalRef: any = useRef();
  const { addItem } = useCart();
  const { t } = useTranslation("");
  // const [offset, setOffset] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(buttonRef);

  // useEffect(() => {
  //   const onScroll = () => setOffset(window.pageYOffset);
  //   // clean up code
  //   window.removeEventListener("scroll", onScroll);
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  useEffect(() => {
    let handler = (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        setImageModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const pagination = image.map((item: any) => item.url);
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img
            className="mt-12 h-16 w-full object-cover rounded-md"
            src={pagination[i]}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thum w-full",
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    let language = router.locale;
    try {
      axios
        .get(
          `/product/${fruitId}?lang=${
            language === "default" ? "en" : language === "ja" ? "ja" : "en"
          }`
        )
        .then((res: any) => {
          setFruit(res?.data?.product);
          setImage(res?.data?.product?.product?.productimage);
          setCategory(res?.data?.category);
        });
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  useEffect(() => {
    let language = router.locale;
    try {
      axios
        .get(
          `/blog?lang=${
            language === "default" ? "en" : language === "ja" ? "ja" : "en"
          }`
        )
        .then((res: any) => {
          setBlogs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  return (
    <div className="relative">
      <Breadcrumb className="w-full lg:w-11/12 mx-auto pt-5 border-b border-gray-100 pb-4">
        <Breadcrumb.Item
          href={
            router.locale === "en"
              ? "/en"
              : router.locale === "ja"
              ? "/ja"
              : "/"
          }
          icon={HiHome}
        >
          {t("Trang chủ")}
          <ToastContainer />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href={
            router.locale === "en"
              ? `/en${fruit?.product?.category?.path}`
              : router.locale === "ja"
              ? `/ja${fruit?.product?.category?.path}`
              : `${fruit?.product?.category?.path}`
          }
          icon={HiOutlineShoppingBag}
        >
          {router.locale === "en"
            ? category?.name
            : router.locale === "ja"
            ? category?.name
            : category?.category?.category}
        </Breadcrumb.Item>
        <Breadcrumb.Item className="hidden md:flex">
          {router.locale === "default"
            ? fruit?.product?.productName
            : fruit?.name}
          <ScrollTop />
        </Breadcrumb.Item>
      </Breadcrumb>

      {isVisible === false ? (
        <div className="sticky top-0 z-50 w-full bg-white shadow-md">
          <div className="flex items-center justify-center md:justify-between md:w-9/12 w-full mx-auto py-1">
            <div className="md:flex gap-2 items-center justify-start hidden">
              <img className="h-14 w-14" src={image[0]?.url} />
              <div className="flex flex-col items-start">
                <p className="font-medium uppercase text-xs">
                  {router.locale === "default"
                    ? fruit?.product?.productName
                    : fruit?.name}
                </p>
                <div className="flex gap-2 items-center">
                  <p>Giá bán:</p>
                  <p className="text-xl text-green-600">
                    {Intl.NumberFormat().format(fruit?.product?.price) + " ₫"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-fit">
              <Button
                size="xs"
                className="w-full md:w-fit bg-[#236815] hover:bg-red-400"
                onClick={() => {
                  console.log(fruit);
                  addItem({ ...fruit, price: fruit?.product?.price });
                  toast("Đã thêm vào giỏ hàng", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    type: toast.TYPE.SUCCESS,
                    className: "toast-message",
                  });
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-medium uppercase">
                    {t("Mua ngay với giá")}{" "}
                    <span>
                      {Intl.NumberFormat().format(fruit?.product?.price) + " ₫"}
                    </span>
                  </p>
                  <p className="text-xs">{t("Đặt mua giao hàng tận nơi")}</p>
                </div>
              </Button>
              <a 
              className="border-green-600 border p-1.5 text-white bg-[#236815] rounded-lg"
              href="tel:0949119338">
                <HiPhone className="block lg:hidden w-fit h-11" />
                <div className="hidden lg:flex flex-col gap-1 items-center justify-center">
                  <p className="text-sm font-medium uppercase">{t("gọi ngay")}</p>
                  <p className="text-xs">0949.119.338</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 mt-6 mb-14 w-full md:w-11/12 lg:w-9/12 mx-auto gap-6">
        <div className="md:col-start-1 md:col-end-2 lg:col-end-4 mb-6">
          <Slider {...settings} className="w-full mx-auto h-fit">
            {image.map((item: any) => {
              return (
                <a
                  href=""
                  key={item.id}
                  onClick={(e: any) => {
                    e.preventDefault();
                    setUrl(item.url);
                    setImageModal(true);
                  }}
                >
                  <img
                    className="h-[380px] w-full object-cover rounded-lg"
                    src={item.url}
                  />
                </a>
              );
            })}
          </Slider>
        </div>

        <div className="mt-14 md:mt-0 md:col-start-2 md:col-end-3 lg:col-start-4 lg:col-end-7">
          <h1 className="text-xl uppercase font-medium">
            {router.locale === "default"
              ? fruit?.product?.productName
              : fruit?.name}
          </h1>

          <div className="flex gap-2 items-center justify-between my-2">
            <div>
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white mr-4">
                  {fruit?.product?.stars}
                </p>

                <a
                  href="#review"
                  className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {fruit?.product?.sold} {t("đánh giá")}
                </a>
              </Rating>
            </div>
            <h5 className="text-sm">
              {t("Đã bán")} {fruit?.product?.sold}
              {/* {router.locale === "en"
                ? `Sold: ${fruit?.sold}`
                : `Đã bán: ${fruit?.sold}`} */}
            </h5>
          </div>

          <div className="flex gap-3 text-xs mt-2 justify-between items-center">
            <div className="flex gap-3">
              <p className="font-medium">{t("Tình trạng:")}</p>
              {/* <p>
                {fruit?.product?.quantity > 50 ? router.locale === "en" ? "Available"
                    : "Còn hàng"
                  : router.locale === "ja"
                  ? "Out of order"
                  : "Hết hàng"}
              </p> */}
            </div>
            <div className="flex gap-3">
              <p className="font-medium">{t("Thương hiệu:")}</p>
              <p>
                {router.locale === "default"
                  ? fruit?.product?.brand
                  : fruit?.brand}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-3xl text-red-500 font-medium">
              {" "}
              {Intl.NumberFormat().format(fruit?.product?.price) + " ₫"}
            </p>
          </div>

          <div ref={buttonRef}>
            <Button
              className="my-4 mx-auto bg-[#236815] hover:bg-red-400"
              onClick={() => {
                console.log(fruit);
                addItem({ ...fruit, price: fruit?.product?.price });
                toast("Đã thêm vào giỏ hàng", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  type: toast.TYPE.SUCCESS,
                  className: "toast-message",
                });
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium uppercase">
                  {t("Mua ngay với giá")}{" "}
                  <span>
                    {Intl.NumberFormat().format(fruit?.product?.price) + " ₫"}
                  </span>
                </p>
                <p className="text-xs">{t("Đặt mua giao hàng tận nơi")}</p>
              </div>
            </Button>
          </div>
        </div>

        <div className="col-start-7 col-end-9 hidden lg:block">
          <div className="flex flex-col items-center px-2 border border-gray-200">
            <h1 className="text-sm font-medium text-center my-3">
              {t("CHÚNG TÔI LUÔN SẴN SÀNG ĐỂ GIÚP ĐỠ BẠN")}
            </h1>
            <img className="" src="/image/support.png" alt="" />
            <p className="text-sm text-center my-3">
              {t("Để được hỗ trợ tốt nhất. Hãy gọi")}
            </p>
            <p className="text-2xl text-red-500 font-medium text-center">
              0949 119 338
            </p>
            <p className="my-3 bg-white px-3 text-[11px]">{t("HOẶC")}</p>
            <p className="text-sm font-medium text-center">
              {t("Để được hỗ trợ tốt nhất")}
            </p>
            <Button
              color={"gray"}
              size={"sm"}
              className="uppercase my-3 bg-white hover:bg-[#236815] hover:text-white border-[#236815] border"
            >
              <p className="text-xs">{t("chat với chúng tôi")}</p>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-8 my-6 w-full md:w-11/12 lg:w-9/12 mx-auto gap-6">
        <div className="md:col-start-1 md:col-end-2 lg:col-end-7">
          <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
            className="flex justify-center"
          >
            <Tabs.Item active={true} title={t("MÔ TẢ")}>
              <div className="text-justify leading-loose">
                {router.locale === "default"
                  ? parse(`${fruit?.product?.content}`)
                  : parse(`${fruit?.content}`)}
              </div>
            </Tabs.Item>
            <Tabs.Item title={t("GIỚI THIỆU")}>
              <img src="/image/mota.png" alt="" />
            </Tabs.Item>
          </Tabs.Group>
        </div>

        <div className="lg:block lg:col-start-7 lg:col-end-9">
          <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
            className="flex justify-start"
          >
            <Tabs.Item className="w-full" title={t("TIN TỨC")}>
              {blogs
                ? blogs?.map((item: any) => {
                    return (
                      <Link
                        key={item?.id}
                        className="flex gap-2 items-center text-xs mb-4"
                        href={
                          router.locale === "en"
                            ? `/en/blog/${item?.blog?.id}`
                            : router.locale === "ja"
                            ? `/ja/blog/${item?.blog?.id}`
                            : `/blog/${item?.blog?.id}`
                        }
                      >
                        <img
                          className="w-12 h-10"
                          src={item?.blog?.image}
                          alt="hero7_1"
                        />
                        <p>
                          {router.locale === "default"
                            ? item?.blog?.title
                            : item?.transTitle}
                        </p>
                      </Link>
                    );
                  })
                : null}
            </Tabs.Item>
          </Tabs.Group>
        </div>
      </div>

      <ImageViewer
        imageModal={imageModal}
        setImageModal={setImageModal}
        url={url}
        ref={modalRef}
      />

      <div className="w-full md:w-11/12  my-6 mx-auto">
        <h2 className="text-2xl uppercase font-medium mb-6">
          {t("Có thể bạn đang tìm kiếm")}
        </h2>
        <Relativeproducts />
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

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default Index;
