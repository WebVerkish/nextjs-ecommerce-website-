
import { getData } from '@/lib/getData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function SidebarCategories() {
    const categoriesData = await getData("categories");
    const categories = categoriesData.filter((category)=>category.products.length>0);
    console.log(categories);
  return (
    <div className="col-span-3  bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 text-slate-800 overflow-hidden hidden sm:block">
        <h2 className="bg-slate-100 dark:bg-slate-700 py-3 px-6 font-semibold text-slate-800 dark:text-slate-100">
          Shop By Category ({categories.length})
        </h2>
        <div className="py-3 px-6 h-[300px] overflow-y-auto space-y-2">
          {categories.map((category, index) => {
            return (
              <Link
                key={index}
                href={`/category/${category.slug}`}
                className="flex items-center gap-3 text-slate-800 hover:bg-slate-50 duration-500 transition-all dark:text-slate-300 dark:hover:bg-slate-600 rounded-md"
              >
                <Image
                  width={556}
                  height={556}
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-10 h-10 rounded-full object-cover border border-lime-600"
                />
                <span className="text-sm">{category.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
  )
}
