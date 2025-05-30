import Breadcrumb from "@/components/frontend/Breadcrumb";
import CategoryList from "@/components/frontend/CategoryList";
import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({ params: { slug } }) {
  const market = await getData(`markets/details/${slug}`);
  const marketCategoriesIds = Array.isArray(market.categoryIds)
    ? market.categoryIds
    : [];

  const categoriesData = await getData("categories");
  const categories = categoriesData.filter(
    (category) =>
      Array.isArray(category.products) && category.products.length >= 1
  );

  const marketCategories = categories.filter((category) =>
    marketCategoriesIds.includes(category.id)
  );
  return (
    <>
      <Breadcrumb />
      <div className="">
        <div className="grid grid-cols-12 py-8 w-full gap-4 mb-6">
          <div className="col-span-12 sm:block p-4  dark:text-slate-50 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden">
            <div className="flex gap-4 items-center">
              <div className="">
                <Image
                  src={market.imageUrl}
                  width={50}
                  height={50}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="">
                <h2 className="py-4 text-xl text-center">{market.title}</h2>
                <p className="text-sm line-clamp-2 mb-4">
                  {market.description}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12  rounded-md">
            {marketCategories.map((category, index) => {
              return (
                <div className="py-8" key={index}>
                  <CategoryList isMarketPage={true} category={category} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
