"use client"
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Breadcrumbs({title,resultCount}) {
  const pageSize =3;
  // per page product number calculation
 const searchParam = useSearchParams();
 const currentPage = searchParam.get("page") || 1;
 const startRange = (currentPage - 1) * pageSize +1;
 const endRange = Math.min(currentPage * pageSize, resultCount);
  return (
    <div className="flex items-center justify-between text-xs">
        <div className="flex items-center">
          <Link href="/">Home</Link>
          <ChevronRight className="w-5 h-5" />
          <p>{title}</p>
        </div>
        <p>{startRange}-{endRange} of {resultCount} results</p>
      </div>
  );
}
