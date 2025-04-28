"use client";
import ImageInput from "@/components/formInputs/ImageInput";

import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextAreaInput";
import TextInput from "@/components/formInputs/TextInput";
import ToggleInput from "@/components/formInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apirequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCategoryForm({ updateData = {} }) {
  const initialImageuRL = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageuRL);
  const [loading, setLoading] = useState(false);
  const markets = [];
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });
  const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/categories");
  }
  async function onSubmit(data) {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    if (id) {
      data.id = id;
      //Put Request (Update)
      makePutRequest(
        setLoading,
        `api/categories/${id}`,
        data,
        "Category",
        redirect
      )
      console.log("update request", data);
    } else {
      //Post Request (Create)
      makePostRequest(
        setLoading,
        "api/categories",
        data,
        "Category",
        reset,
        redirect
      );
      setImageUrl("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Category Title"
          name="title"
          register={register}
          errors={errors}
          // className="w-full"
        />
        {/* <SelectInput
            label="Select Markets"
            name="marketsIds"
            register={register}
            errors={errors}
            className="w-full"
            options={markets}
            multiple={false}
          /> */}
        <TextareaInput
          label="Category Description"
          name="description"
          register={register}
          errors={errors}
        />
        <ImageInput
          label="Category Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
        />
        <ToggleInput
          label="Publish your Category"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Category" : "Create Category"}
        loadingButtonTitle={`${
          id ? "Creating" : "Updating"
        } Category please wait...`}
      />
    </form>
  );
}
