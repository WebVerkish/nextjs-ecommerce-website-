"use client";
import { BaggageClaim } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";

export default function CategoryCarousel({ products,isMarketPage=false }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: isMarketPage ? 3 : 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: isMarketPage ? 3 : 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: isMarketPage ? 2 : 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: isMarketPage ? 1 : 2,
    },
  };

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
      {products && products.length > 0 ? (
        products.map((product, index) => {
          return (
            <Product product={product} key={index} />
          );
        })
      ) : (
        <p>No data available</p>
      )}
    </Carousel>
  );
}
