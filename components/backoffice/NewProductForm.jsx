"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import ArrayitemsInput from "@/components/formInputs/ArrayitemsInput";
import ImageInput from "@/components/formInputs/ImageInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextAreaInput";
import TextInput from "@/components/formInputs/TextInput";
import ToggleInput from "@/components/formInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apirequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUniqueCode } from "@/lib/generateUniqueCode";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MultipleImageInput from "../formInputs/MultipleImageInput";

export default function NewProductForm({categories,farmers,updateData={}}) {
  const initialImageuRL = updateData?.imageUrl ?? "";
  const initialTags = updateData?.tags ?? [];
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageuRL);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(initialTags);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      isWholesale: false,
      ...updateData,
    },
  });
  const isActive = watch("isActive");
  const isWholesale = watch("isWholesale");
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/products");
  }
  const [productImages,setProductImages] =useState([]);
  console.log(productImages);
  async function onSubmit(data) {
    setLoading(true);
    const slug = generateSlug(data.title);
    const productCode = generateUniqueCode("EWP",data.title);
    data.productCode = productCode;
    data.slug = slug;
    data.productImages = productImages;
    data.tags = tags;
    data.qty = 1;
    //console.log(data);
    if(id){
      makePutRequest(
        setLoading,
        `api/products/${id}`,
        data,
        "Product",
        redirect
      );
    }else{
      makePostRequest(
        setLoading,
        "api/products",
        data,
        "Product",
        reset,
        redirect
      );
      setProductImages([]);
      setTags([]);
    }
  }
  return (
    <div>
      <FormHeader title={id? "Update Product":"New Product"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Product Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Product SKU"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Product Barcode"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Price (Before Discount)"
            name="productPrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Sale Price (Discounted)"
            name="salePrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Stock"
            name="productStock"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Unit of Measurement(eg Kilogram)"
            name="unit"
            type="text"
            register={register}
            errors={errors}
          />
          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <SelectInput
            label="Select Farmer"
            name="farmersId"
            register={register}
            errors={errors}
            className="w-full"
            options={farmers}
          />
          <ToggleInput
            label="Supports Wholesale Selling"
            name="isWholesale"
            trueTitle="Supported"
            falseTitle="Not Supported"
            register={register}
          />
          {isWholesale && (
            <>
              <TextInput
                label="Wholesale Price"
                name="wholesalePrice"
                type="number"
                register={register}
                errors={errors}
                className="w-full"
              />
              <TextInput
                label="Minimum Wholesale Quantity"
                name="wholesaleQty"
                type="number"
                register={register}
                errors={errors}
                className="w-full"
              />
            </>
          )}
          <MultipleImageInput 
            label="Product Images"
            imageUrls={productImages}
            setImageUrls={setProductImages}
            endpoint="multipleProductsUploader"
          />
          {/* <ImageInput
            label="Product Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="productImageUploader"
          /> */}
          {/* {tags} */}
          <ArrayitemsInput setItems={setTags} items={tags} itemTitle="Tag" />

          <TextareaInput
            label="Product Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ToggleInput
            label="Publish your Product"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Product" : "Create Product"}
          loadingButtonTitle={`${
            id ? "Creating" : "Updating"
          } Product please wait...`}
        />
      </form>
    </div>
  );
}
