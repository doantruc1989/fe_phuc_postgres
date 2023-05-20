import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Hero() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 968 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 968, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <Carousel
        swipeable={false}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={2000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        deviceType={"desktop"}
        dotListClass="custom-dot-list-style"
        // itemClass="carousel-item-margin-40-px"
      >
        <Link href="/fruitgift">
          <img className="w-full" src="/image/slider1.png" alt="slide1" />
        </Link>
        <Link href={"/vnfruit"}>
          <img className="w-full" src="/image/slider2.png" alt="slide1" />
        </Link>
        <Link href={"/importfruit"}>
          <img className="w-full" src="/image/slider3.png" alt="slide1" />
        </Link>
        <Link href={"/fruitgift"}>
          <img className="w-full" src="/image/slider4.png" alt="slide1" />
        </Link>
      </Carousel>
    </div>
  );
}

export default Hero;
