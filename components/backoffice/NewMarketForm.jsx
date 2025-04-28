"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import ImageInput from "@/components/formInputs/ImageInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextAreaInput";
import TextInput from "@/components/formInputs/TextInput";
import ToggleInput from "@/components/formInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apirequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewMarketForm({ categories, updateData = {} }) {
  const initialImageuRL = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageuRL);
  const [loading, setLoading] = useState(false);
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
    router.push("/dashboard/markets");
  }
  async function onSubmit(data) {
    {
      // -id =auto()
      // -title
      // -slug =auto()
      // -description
      // -image
    }
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    //console.log(data);
    if (id) {
      makePutRequest(
        setLoading,
        `api/markets/${id}`,
        data,
        "Market",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/markets",
        data,
        "Market",
        reset,
        redirect
      );
      setImageUrl("");
    }
  }
  return (
    <div>
      <FormHeader title={id?"Update Market":"New Market"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Market Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />

          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            multiple={true}
          />
          <ImageInput
            label="Market Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="marketImageUploader"
          />
          <TextareaInput
            label="Market Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ToggleInput
            label="Publish your Market"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Market" : "Create Market"}
        loadingButtonTitle={`${
          id ? "Creating" : "Updating"
        } Market please wait...`}
        />
      </form>
    </div>
  );
}
