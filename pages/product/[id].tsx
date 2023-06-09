import {
  Breadcrumb,
  Button,
  Label,
  Radio,
  Rating,
  Tabs,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useId, useRef, useState } from "react";
import { HiHome, HiOutlineShoppingBag, HiPhone, HiX } from "react-icons/hi";
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
import MessengerFbChat from "../components/MessengerFbChat";
import ImageViewer from "../components/ImageViewer";

function Index() {
  const [fruit, setFruit] = useState([] as any);
  const [variant, setVariant] = useState([] as any);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState([] as any);
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
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [el, setEl] = useState("");
  const [el2, setEl2] = useState("");
  const [el3, setEl3] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [clearDisplay, setClearDisplay] = useState(false);
  const [itemType, setItemType] = useState([] as any);

  useEffect(() => {
    if (offsetHeight > 455 && innerWidth > 768) {
      setEl2("md:flex gap-2 items-center justify-start hidden");
      setEl3(
        "`border-green-600 border w-fit p-1.5 text-white bg-[#236815] rounded-lg"
      );
      return setEl("fixed shadow-md");
    } else if (offsetHeight > 885 && innerWidth <= 768) {
      setEl2("md:flex gap-2 items-center justify-start hidden");
      setEl3(
        "`border-green-600 border w-fit p-1.5 text-white bg-[#236815] rounded-lg"
      );
      return setEl("fixed shadow-md");
    }
    setEl2("hidden");
    setEl3("hidden");
    return setEl("mt-4");
  }, [offsetHeight]);

  useEffect(() => {
    const onScroll = () => setOffsetHeight(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          setVariant(res?.data?.product?.product?.productVariant);
          setFruit(res?.data?.product);
          setPrice(res?.data?.product?.product?.price);
          setImage(res?.data?.product?.product?.productimage);
          setCategory(res?.data?.category);
          setDiscount(res?.data?.product?.product?.discount);
        });
    } catch (error) {
      console.log(error);
    }
  }, [router, isClear]);

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
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 mt-6 mb-14 w-full md:w-11/12 lg:w-9/12 mx-auto gap-6">
        <div className="md:col-start-1 md:col-end-2 lg:col-end-4 mb-6">
          <Slider {...settings} className="w-full mx-auto h-fit">
            {image.map((item: any) => {
              return (
                <a
                  className="relative"
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
                  {discount?.value === undefined ? null : (
                    <span className="text-base absolute bg-red-700 text-white px-1 rounded -md top-0 left-0">{`SALE ${
                      discount?.value * 100
                    }%`}</span>
                  )}
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
            </h5>
          </div>

          <div className="flex gap-3 text-xs mt-2 justify-between items-center">
            <div className="flex gap-3">
              <p className="font-medium">{t("Tình trạng:")}</p>
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

          {discount?.value === undefined ? (
            <div className="mt-3 flex items-center justify-between">
              <p className="text-3xl text-red-500 font-medium">
                {" "}
                {Intl.NumberFormat().format(price) + " ₫"}
              </p>
            </div>
          ) : (
            <div className="mt-3 flex items-end justify-start gap-4">
              <p className="text-3xl text-red-500 font-medium">
                {" "}
                {Intl.NumberFormat().format(price * (1 - discount?.value)) +
                  " ₫"}
              </p>
              <p className="text-base line-through">
                {Intl.NumberFormat().format(price)} đ
              </p>
            </div>
          )}
          {variant.length !== 0 ? (
            <div className="my-3 flex items-center justify-between">
              <p className="font-medium">{t("Loại")}:</p>
              {clearDisplay === false ? null : (
                <div
                  className="text-red-600 text-sm underline cursor-pointer"
                  onClick={(e: any) => {
                    e.preventDefault;
                    setIsClear(!isClear);
                    setClearDisplay(false);
                  }}
                >
                  clear
                </div>
              )}
            </div>
          ) : null}
          <div className="mb-3 grid grid-cols-3 gap-5 items-center justify-center">
            {variant.length !== 0
              ? variant.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-1 border border-green-600 mx-auto w-fit p-2 rounded-md bg-green-700 text-white hover:bg-green-500 text-center align-middle"
                    >
                      <Radio
                        id={item.id}
                        className="cursor-pointer"
                        name="variant"
                        defaultChecked={clearDisplay}
                        onClick={() => {
                          setPrice(item.price);
                          setItemType(item);
                          setClearDisplay(true);
                        }}
                      />
                      <Label
                        htmlFor={item.id}
                        className="cursor-pointer text-white flex flex-col"
                      >
                        {item?.variantAttribute
                          ? item?.variantAttribute?.map((res: any) => {
                              return <p key={res.id}>{res.attribute.value}</p>;
                            })
                          : null}
                      </Label>
                    </div>
                  );
                })
              : null}
          </div>

          <div className={`left-0 top-0 z-50 w-full bg-white ${el}`}>
            <div className="flex items-center justify-center md:justify-between md:w-9/12 w-full mx-auto py-1">
              <div className={`${el2}`}>
                <img className="h-14 w-14" src={image[0]?.url} />
                <div className="flex flex-col items-start">
                  <p className="font-medium uppercase text-xs">
                    {router.locale === "default"
                      ? fruit?.product?.productName
                      : fruit?.name}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p>Giá bán:</p>
                    {discount?.value === undefined ? (
                      <span className="text-xl text-red-600">
                        {Intl.NumberFormat().format(price) + " ₫"}
                      </span>
                    ) : (
                      <span className="text-xl text-red-600">
                        {Intl.NumberFormat().format(
                          price * (1 - discount?.value)
                        ) + " ₫"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-fit">
                <Button
                  size="xs"
                  className="w-full md:w-fit bg-[#236815] hover:bg-red-400"
                  onClick={() => {
                    addItem({
                      ...fruit,
                      itemType: itemType.length === 0 ? null : itemType,
                      price:
                        discount?.value === undefined
                          ? price
                          : Math.ceil(price * (1 - discount?.value)),
                      id:
                        itemType.id === undefined
                          ? fruit.product.id
                          : `${fruit.product.id}.${itemType.id}`,
                      weight: fruit.product.weight,
                      productImage: image[0]?.url,
                    });

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
                      {discount?.value === undefined ? (
                        <span>{Intl.NumberFormat().format(price) + " ₫"}</span>
                      ) : (
                        <span>
                          {Intl.NumberFormat().format(
                            price * (1 - discount?.value)
                          ) + " ₫"}
                        </span>
                      )}
                    </p>
                    <p className="text-xs">{t("Đặt mua giao hàng tận nơi")}</p>
                  </div>
                </Button>
                <a className={`${el3}`} href="tel:0949119338">
                  <HiPhone className="block lg:hidden w-10 h-10" />
                  <div className="hidden lg:flex flex-col gap-1 items-center justify-center">
                    <p className="text-sm font-medium uppercase">
                      {t("gọi ngay")}
                    </p>
                    <p className="text-xs">0949.119.338</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-start-7 lg:col-end-9">
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
      />

      <MessengerFbChat />

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
