"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function Paginate({ totalPages,isSearch }) {
  const searchParam = useSearchParams();
  const currentPage = parseInt(searchParam.get("page") || 1);
  const min = searchParam.get("min") || 0;
  const max = searchParam.get("max"); 
  const sort = searchParam.get("sort") || "asc"; 
  const search = searchParam.get("search");
  console.log(currentPage,totalPages)
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={isSearch?`
            ${
              currentPage === 1
                ? `?${new URLSearchParams({ search, page: 1,sort,min,max })}`
                : `?${new URLSearchParams({ search,page: parseInt(currentPage) - 1,sort,min,max })}`
            }`:`${
              currentPage === 1
                ? `?${new URLSearchParams({  page: 1,sort,min,max })}`
                : `?${new URLSearchParams({ page: parseInt(currentPage) - 1,sort,min,max })}`
            }`}
          />
        </PaginationItem>
        {totalPages <= 3 ? (
          Array.from({ length: 3 }, (_, index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink href={`?${new URLSearchParams({ page:index + 1 })}`} isActive={index + 1 === currentPage}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : (
          <>
            {Array.from({ length: 3 }, (_, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink href={`?${new URLSearchParams({ page:index + 1 })}`}>{index + 1}</PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={`${
              currentPage === totalPages
                ? `?${new URLSearchParams({ page: totalPages })}`
                : `?${new URLSearchParams({ page: parseInt(currentPage) + 1 })}`
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
