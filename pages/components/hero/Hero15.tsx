import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Hero15() {
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
    <div className="my-12">
      <h1 className="text-3xl uppercase font-medium mt-3">
        ĐỐI TÁC - KHÁCH HÀNG
      </h1>

      <div className="mt-6">
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
          <img
            className="w-fit mx-auto hover:scale-110 transition-all duration-500 cursor-pointer"
            src="/image/dtkh1.png"
            alt="dsa"
          />
          <img
            className="w-fit mx-auto hover:scale-110 transition-all duration-500 cursor-pointer"
            src="/image/dtkh2.png"
            alt="dsa"
          />
          <img
            className="w-fit mx-auto hover:scale-110 transition-all duration-500 cursor-pointer"
            src="/image/dtkh3.png"
            alt="dsa"
          />
          <img
            className="w-fit mx-auto hover:scale-110 transition-all duration-500 cursor-pointer"
            src="/image/dtkh4.png"
            alt="dsa"
          />
        </Carousel>
      </div>
    </div>
  );
}

export default Hero15;
