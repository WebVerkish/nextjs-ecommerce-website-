"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../../styles/main.css";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductImageCrousel({ productImages = [], thumbnail }) {
  const [selectedImage, setSelectedImage] = useState(thumbnail); // State for the main image

  const handleThumbnailClick = (image) => {
    setSelectedImage(typeof image === "string" ? image : image.url);
  };

  return (
    <div className="col-span-3">
      <div className="main-image-container mb-4">
        <Image
          src={selectedImage}
          alt="Main product image"
          width={556}
          height={556}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {productImages.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "150px",
          }}
          className="product-carousel"
        >
          {productImages.map((image, index) => (
            <SwiperSlide
              key={`slide-${index}`}
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer", // Indicate clickable thumbnails
              }}
              onClick={() => handleThumbnailClick(image)} // Update main image on click
            >
              <div
                className="slide"
                style={{
                  width: "120px", // Smaller width for thumbnails
                  height: "120px", // Smaller height for thumbnails
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#f0f0f0",
                  border:
                    selectedImage === (typeof image === "string" ? image : image.url)
                      ? "2px solid #000" // Highlight selected thumbnail
                      : "2px solid transparent",
                }}
              >
                <img
                  src={typeof image === "string" ? image : image.url}
                  alt={`Product image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Ensure full image is visible
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}