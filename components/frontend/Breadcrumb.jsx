"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb() {
  const pathName = usePathname();
  const pathArr = pathName.split("/");
  pathArr.shift();
  console.log(pathArr);
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center capitalize">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Home className="w-3 h-3 me-2.5" />
            Home
          </Link>
        </li>
        {pathArr.map((item, i) => {
          return (
            <li key={i}>
              <div className="flex items-center capitalize">
                <ChevronRight />
                <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                  {item}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
