"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function TrainingCarousel({trainings}) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const slides = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
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
      {trainings.map((training, index) => {
        return (
          <div href="/" key={index} className="rounded-lg mr-3 border border-white shadow-md overflow-hidden bg-slate-100 dark:bg-slate-950">
            <Link href="#">
              <Image
                src={training.imageUrl}
                alt={training.title}
                width={556}
                height={556}
                className="w-full rounded-lg h-48 object-cover"
              />
            </Link>
            <h2 className="text-center text-slate-800 my-2 text-xl dark:text-slate-200 mb-2">
              {training.title}
            </h2>
            <p className="text-slate-800 mt-2 dark:text-slate-200 px-4 line-clamp-3">
              {training.description}
            </p>
            <div className="flex justify-between items-center px-4  py-2">
              <Link
                href="#"
                className="bg-lime-600 hover:bg-lime-700 duration-300 transition-all text-slate-200 mt-2 dark:text-slate-200 rounded-md px-4 py-2"
              >
                Read More
              </Link>
              <Link href="#" className="text-slate-800 mt-2 dark:text-slate-200">Talk to the Consultant</Link>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
