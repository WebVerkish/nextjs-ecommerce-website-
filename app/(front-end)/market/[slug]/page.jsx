import CategoryList from "@/components/frontend/CategoryList";
import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter((category)=>{
    return category.products.length >= 1
  })
  return (
    <div className="">
      <div className="grid grid-cols-12 py-8 w-full gap-4 mb-6">
        <div className="col-span-2 sm:block p-4  dark:text-slate-50 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden">
          <div className="">
            <div className="flex item-center justify-center">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
            <h2 className="py-4 text-sm text-center">Sproutes Farmers Market</h2>
            <p className="text-sm line-clamp-2 mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
              sapiente ea officiis eaque veniam numquam incidunt, perferendis,
              vel corporis nesciunt eum vitae. Doloribus ea sed eligendi, odio
              eaque consequuntur, nisi at culpa corporis aut quod dolores rerum
              nesciunt voluptate necessitatibus!
            </p>
          </div>
          <div className="text-sm flex flex-col">
            <Link href="#" className="py-2">
              Category 1
            </Link>
            <Link href="#" className="py-2">
              Category 1
            </Link>
            <Link href="#" className="py-2">
              Category 1
            </Link>
            <Link href="#" className="py-2">
              Category 1
            </Link>
            <Link href="#" className="py-2">
              Category 1
            </Link>
            <Link href="#" className="py-2">
              Category 1
            </Link>
            <Link href="#" className="py-2">
              Category 1
            </Link>
          </div>
        </div>
        <div className="col-span-10  rounded-md">
          {categories.map((category, index) => {
            return (
              <div className="py-8" key={index}>
                <CategoryList category={category} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
