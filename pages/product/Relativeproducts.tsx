import { Rating } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiStar } from "react-icons/hi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "../../other/axios";

function Relativeproducts() {
  const [fruits, setFruits] = useState([] as any);
  const router = useRouter();
  const { t } = useTranslation("");
  useEffect(() => {
    let language = router.locale;
    try {
      axios
        .get(
          `/product?page=1&take=20&search=allRandom&lang=${
            language === "default" ? "en" : language === "ja" ? "ja" : "en"
          }`
        )
        .then((res: any) => {
          setFruits(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 968 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 968, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={true}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={2000}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      deviceType={"desktop"}
      dotListClass="custom-dot-list-style"
    >
      {fruits?.map((item: any) => {
        return (
          <div
            key={item?.id}
            className="rounded-lg mx-1 border border-gray-200 shadow-sm hover:shadow-lg bg-white mb-1.5"
          >
            <Link
              href={
                router.locale === "en"
                  ? `/en/product/${item?.product?.slug}`
                  : router.locale === "ja"
                  ? `/ja/product/${item?.product.slug}`
                  : `/product/${item?.product.slug}`
              }
            >
              <div className="flex items-center gap-1 px-1 font-medium text-white absolute border rounded-tl-md rounded-br-md border-gray-400 bg-blue-500 text-sm md:text-[10px] uppercase">
                <HiStar className="font-medium text-sm" />
                <p>
                  {router.locale === "defaul"
                    ? item?.product?.brand
                    : item?.enBrand}
                </p>
              </div>
              <div className="overflow-hidden">
                <img
                  src={item?.product?.image}
                  className="rounded-t-lg cursor-pointer w-full h-60 object-cover hover:scale-110 transition-all duration-500"
                  alt="..."
                />
              </div>

              <div className="cursor-pointer text-center text-sm">
                <p className="font-medium text-gray-900 dark:text-white mx-1 mt-2 mb-3 text-ellipsis h-8">
                  {router.locale === "default"
                    ? `${item?.product?.productName.substring(0, 30)}...`
                    : `${item?.enName.substring(0, 30)}...`}
                </p>
                <div className="flex gap-3 items-center justify-center mt-1">
                  <div className="flex gap-1 pr-1 items-center border-r border-gray-200">
                    <p>{item?.product?.stars}</p>
                    <Rating size="sm">
                      <Rating.Star />
                    </Rating>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p>{t("Đã bán")}:</p>
                    <p className="font-medium">{item?.product?.sold}</p>
                  </div>
                </div>
              </div>

              {item?.product?.discount?.disPercent ? (
                <div className="flex gap-2 pl-2 items-center justify-center">
                  <p className="text-base md:text-sm font-medium text-red-600 dark:text-white my-1">
                    {Intl.NumberFormat().format(item?.product?.price)} đ
                  </p>
                  <p className="text-red-500 font-bold text-xs">
                    {"-" + item?.product?.discount?.disPercent + "%"}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 pl-2 items-center justify-center mt-2">
                  <p className="text-lg font-medium text-red-600 dark:text-white my-1">
                    {Intl.NumberFormat().format(item?.product?.price)} đ
                  </p>
                </div>
              )}
            </Link>
          </div>
        );
      })}
    </Carousel>
  );
}

export default Relativeproducts;
