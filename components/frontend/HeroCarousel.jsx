"use client";
import React from "react";
import { Carousel } from "nuka-carousel";
import Image from "next/image";

export default function HeroCarousel({banners}) {
  // const config = {
  //     containerClassName: "border-4 border-red-500",
  //     nextButtonClassName: "string",
  //     nextButtonStyle: "CSSProperties",
  //     pagingDotsClassName: "me-2",
  //     pagingDotsContainerClassName: "string",
  //     prevButtonClassName: "string",
  //   }
  return (
    <Carousel
      autoplay
      showArrows
      className="rounded-md  border-solid mx-auto w-full overflow-hidden"
      wrapMode="wrap"
    >
      {
        banners.map((banner,i)=>{
          return (
            <img key={i} width={712} height={384} src={banner.imageUrl} className="w-full" alt={banner.title}/>
            // <Image key={i} width={712} height={384} src={banner.imageUrl} className="w-full" alt={banner.title}/>
          )
        })
      }
      
    </Carousel>
  );
}
