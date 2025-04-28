"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function Sorting({ title, products, slug,isSearch }) {

  const searchParam = useSearchParams();
  const sortParam = searchParam.get("sort");

  const relevance = `/category/${slug}`;
  const hightToLow = `/category/${slug}?sort=desc`;
  const lowToHigh = `/category/${slug}?sort=asc`;

  const sortingLinks = [
    {
      title: "Relevance",
      href: relevance,
      sort :null
    },
    {
      title: "Price - High to Low",
      href: hightToLow,
      sort :"desc"
    },
    {
      title: "Price - Low to High",
      href: lowToHigh,
      sort :"asc"
    },
  ];
  return (
    <div className="flex items-center justify-between">
      {/* <h2 className="text-2xl">Search Result - Electronic</h2> */}
      <h2 className="text-2xl font-medium">{isSearch && "Search Result - "} {title}</h2>
      <div className="flex text-sm gap-2 items-center">
        <p>Sort by: </p>
        <div className="flex gap-1 items-center">
          {sortingLinks.map((link, index) => {
            return (
              <Link
                key={index}
                className={`${link.sort === sortParam ? "bg-slate-800 border border-lime-400 px-2 py-1 text-lime-400" : "border border-slate-500 px-2 py-1"}`}
                href={link.href}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
