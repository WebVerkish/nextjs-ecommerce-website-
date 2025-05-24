import React from "react";
import TrainingCarousel from "./TrainingCarousel";
import Link from "next/link";
import { getData } from "@/lib/getData";
import BlogCard from "./BlogCard";
import { MoveRight } from "lucide-react";

export default async function CommunityTrainings({trainings,title}) {
  
  return (
    // <div className=" bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 text-slate-800 overflow-hidden">
    //     <div className="bg-slate-100 dark:bg-slate-900 py-3 px-6 font-semibold text-slate-800 dark:text-slate-100 flex justify-between items-center">
    //       <h2>Ecom Community</h2>
    //       <Link href="#" className='bg-lime-600 hover:bg-lime-700 duration-300 transition-all text-slate-50 rounded-md px-4 py-2'>See All</Link>
    //     </div>
    //     <div className="bg-white dark:bg-slate-700 p-4">
    //       <TrainingCarousel trainings={trainings} />
    //     </div>
    // </div>
    <section className="py-12 bg-white sm:py-16 lg:py-20 dark:bg-slate-700 rounded-md shadow-lg">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className=" mx-auto md:mx-0">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-slate-100">
              {title}
            </h2>
            <Link href="/blogs" className="text-slate-50 flex items-center bg-slate-800 py-3 px-5 rounded">See All
              <MoveRight className="flex-shrink-0 mx-2"/>
            </Link>
          </div>
          <p className="mt-5 text-base font-normal leading-7 text-gray-500 dark:text-gray-200">
            Create custom landing pages with Rareblocks that converts more
            visitors than any website.
          </p>
        </div>

        <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
          {trainings.map((training, index) => {
            return <BlogCard key={index} training={training} />;
          })}
        </div>
      </div>
    </section>
  );
}
