"use client"
import { Circle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";

export default function PriceFilter({ slug,isSearch }) {
  const searchParam = useSearchParams();
  const minParam = searchParam.get("min");
  const maxParam = searchParam.get("max"); 
  const page = searchParam.get("page") || 1; 
  const sort = searchParam.get("sort") || "asc"; 
  const search = searchParam.get("search");
  const priceRanges = [
    {
      display: "under 200",
      min: 0,
      max: 200,
    },
    {
      display: "Between 200 and 400",
      min:200,
      max: 400,
    },
    {
      display: "Above 500",
      min: 500,
    },
  ];
  const router = useRouter();
  const {handleSubmit,reset,register} = useForm();
  function onSubmit(data){
    const {min,max} =data;
    if(min && max){
      router.push(`/category/${slug}?sort=asc&min=${min}&max=${max}`);
      reset();
    }
    else if(min){
      router.push(`/category/${slug}?sort=asc&min=${min}`);
      reset();
    }
    else if(max){
      router.push(`/category/${slug}?sort=asc&max=${max}`);
      reset();
    }
  }
  return (
    <div>
      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Price</h2>
          <Link href={`/category/${slug}`} className="text-white bg-lime-700 hover:bg-lime-800
          focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
          dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800">Reset Filters</Link>
        </div>
        {/* {Filters} */}
        <div className="flex flex-col gap-3">
          {priceRanges.map((priceRange, index) => {
            return (
              <Link
                key={index}
                href={
                  isSearch ? `?${new URLSearchParams({
                    search,
                    page,
                    sort,
                    min:priceRange.min || 0,
                    max:priceRange.max || "",
                  })}`:`?${new URLSearchParams({
                    page,sort,
                    min:priceRange.min || 0,
                    max:priceRange.max || "",
                  })}`
                }
                className={`${
                  (priceRange.min && priceRange.min == minParam) ||
                  (priceRange.max && priceRange.max == maxParam) ||
                  (priceRange.min && priceRange.max && minParam == priceRange.min && priceRange.max == maxParam)?"flex gap-2 items-center text-lime-500":"flex gap-2 items-center"
                }`}
              >
                <Circle className="w-4 h-4 flex-shrink-0"/>
                {priceRange.display}
              </Link>
            );
          })}
        </div>
        <form  className="grid grid-cols-3 gap-4 my-4">
          <div className="col-span-1">
            <input type="number" {...register("min")}
            id="cvv-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500
            focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:forcus:border-lime-500"
            placeholder="Min"/>
          </div>
          <div className="col-span-1">
            <input type="number" {...register("max")}
            id="cvv-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500
            focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:forcus:border-lime-500"
            placeholder="Max"/>
          </div>
          <div className="col-span-1">
            <button type="submit" className="text-white bg-lime-700 hover:bg-lime-800
            focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
            dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800">
              Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
