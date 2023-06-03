import { Card } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "../../../other/axios";

function Hero({ slides }: any) {
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
      >
        {slides
          ? slides.map((item: any) => {
              return (
                <Link key={item.id} href={item.path}>
                  <img className="w-full" src={item.url} alt={item.name} />
                </Link>
              );
            })
          : null}
      </Carousel>
    </div>
  );
}

export default Hero;
