"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function MarketsCarousel({markets}) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  const slides = [{}, {}, {}, {}, {}, {}, {},{}, {}, {}];
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      //   deviceType={}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
      {markets.map((market, index) => {
        return (
          <Link href={`/market/${market.slug}`} key={index} className="rounded-lg mr-3">
            <Image
              src={market.imageUrl}
              alt={market.title}
              width={556}
              height={556}
              className="w-full rounded-lg"
            />
            <h2 className="text-center text-slate-800 mt-2 dark:text-slate-200">{market.title}</h2>
          </Link>
        );
      })}
    </Carousel>
  );
}
