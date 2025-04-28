import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import Sorting from "./Sorting";
import Filters from "./Filters";
import FilterProducts from "./FilterProducts";

export default function FilterComponent({category,products}) {
  console.log(products);
  const {title,slug,isSearch } = category
  const productCount =  category.products.length;
  return (
    <div className="">
      <div className="bg-white space-y-6 text-slate-900 py-8 px-4 ">
        <Breadcrumbs title={title} resultCount={productCount}/>
        <Sorting title={title} isSearch={category?.isSearch}  products={products} slug={slug}/>
      </div>
      <div className="grid grid-cols-12 py-8 gap-4">
        <div className="col-span-3">
            <Filters slug={slug} isSearch={category?.isSearch}/>
        </div>
        <div className="col-span-9">
            <FilterProducts  productCount={productCount} products={products} isSearch={category?.isSearch}/>
        </div>
      </div>
    </div>
  );
}
