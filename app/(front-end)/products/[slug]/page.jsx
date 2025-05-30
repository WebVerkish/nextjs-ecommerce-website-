import AddToCartButton from "@/components/frontend/AddToCartButton";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CategoryCarousel from "@/components/frontend/CategoryCarousel";
import ProductImageCrousel from "@/components/frontend/ProductImageCrousel";
import ProductShareButton from "@/components/frontend/ProductShareButton";
import { getData } from "@/lib/getData";
import { BaggageClaim, Minus, Plus, Send, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductDetailsPage({ params: { slug } }) {
  const product = await getData(`products/product/${params.slug}`);
  const productId = product.id;
  const catId = product.categoryId;
  const category = await getData(`categories/${catId}`);
  const categoryProducts = category.products;
  if (!category || !Array.isArray(category.products)) {
    // If no category or no products, default to empty array
    const products = [];
  } else {
    const products = category.products.filter(
      (product) => product.id !== productId
    );
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToShare = `${baseUrl}/product/${params.slug}`;
  return (
    <div>
      <Breadcrumb />
      <div className="grid grid-cols-12 gap-5 mb-8">
        <ProductImageCrousel
          productImages={product.productImages}
          thumbnail={product.imageUrl}
        />
        <div className="col-span-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl lg:text-3xl">{product.title}</h2>
            <button>
              <ProductShareButton urlToShare={urlToShare} />
            </button>
          </div>
          <div className="border-b border-gray-400">
            <p className="py-2 ">{product.description}</p>
            <div className="flex items-center gap-8 mb-4">
              <p>SKU :{product.sku}</p>
              <p className="bg-lime-100 py-1.5 px-4 rounded-full text-slate-900">
                <b>Stock</b> {product.productStock}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 pt-4 border-b border-gray-400 pb-4">
            <div className="flex items-center gap-2 pt-4">
              <h4 className="text-2xl">${product.salePrice}</h4>
              <del className="text-slate-400 text-sm">
                ${product.productPrice}
              </del>
            </div>
            <p className="flex items-center">
              <Tag className="w-5 h-5 text-slate-400  me-2" />
              Save 50% off Now
            </p>
          </div>
          <div className="flex justify-between items-center mt-4 mb-8">
            <AddToCartButton product={product} />

            <p>Something Here</p>
            {/* <div className=" rounded-xl border border-gray-400 flex gap-3 items-center">
              <button className="border-r border-gray-400 px-4 py-2">
                <Minus />
              </button>
              <p className="flex-grow px-4 py-2">1</p>
              <button className="border-l border-gray-400 px-4 py-2">
                <Plus />
              </button>
            </div> */}
          </div>
        </div>
        <div className="col-span-3 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 text-slate-800 overflow-hidden hidden sm:block">
          <h2 className="bg-slate-100 dark:bg-slate-700 py-3 px-6 font-semibold text-slate-800 dark:text-slate-100">
            Delivery and Returns
          </h2>
          <div className="p-4 ">
            <div className="flex rounded-lg py-2 px-4 bg-orange-400 text-slate-50 items-center gap-3">
              <span>Ecom Express</span>
              <Send />
            </div>
            <div className="py-3 text-slate-100 border-b border-slate-500">
              Eleigible for free Delivery.
              <Link href="#">View Details</Link>
            </div>
            <h2 className="text-slate-200 py-2">Choose Your Location</h2>
            <div className=" pb-3">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div className=" pb-3">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div className="pb-3">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-700 p-4 rounded-xl ">
        <h2 className="mb-4 text-xl font-semibold text-slate-200 ml-3 ">
          Similar Products
        </h2>
        <CategoryCarousel products={products} />
      </div>
    </div>
  );
}
