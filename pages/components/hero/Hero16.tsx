import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";

const Hero16 = () => {
  const [blogs, setBlogs] = useState([] as any);
  const { t } = useTranslation("");
  const router = useRouter();
  useEffect(() => {
    try {
      axios.get(`http://localhost:3007/blog`).then((res: any) => {
        setBlogs(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 968 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
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
    <div className="mt-12">
      <Link href="/blog">
        <h1 className="text-3xl uppercase font-medium mt-3">{t("Tin Tức")}</h1>
        <p className="w-full md:w-1/2 text-gray-400 text-sm mt-3">
          {t("Chia sẻ thông tin bổ ích từ PhucFresh")}
        </p>
      </Link>
      <div className="mt-6 mx-5">
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
          //   removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          deviceType={"desktop"}
          dotListClass="custom-dot-list-style"
        >
          {blogs?.map((blog: any) => {
            return (
              <div
                key={blog?.id}
                className="rounded-lg mx-1 border border-gray-200 shadow-sm hover:shadow-lg bg-white mb-1.5"
              >
                <Link href={router.locale === "en" ? `/en/blog/${blog.id}` : `/blog/${blog.id}`}>
                  <div className="flex items-center gap-1 px-1 font-medium text-white absolute border rounded-tl-md rounded-br-md border-gray-400 bg-blue-500 text-sm md:text-[10px] uppercase">
                    <p>New</p>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src={blog?.image}
                      className="rounded-t-lg cursor-pointer w-full h-60 object-cover hover:scale-110 transition-all duration-500"
                      alt="..."
                    />
                  </div>

                  <div className="cursor-pointer text-center text-xs mb-3 h-14">
                    <p className="font-medium text-base text-pink-500 dark:text-white mx-1 mt-2 text-ellipsis">
                    {router.locale === "en" ? blog?.blogEn?.enTitle.substring(0, 40) : blog?.title.substring(0, 40)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero16;
