"use client";
import ImageInput from "@/components/formInputs/ImageInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextAreaInput";
import TextInput from "@/components/formInputs/TextInput";
import ToggleInput from "@/components/formInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apirequest";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ArrayitemsInput from "../formInputs/ArrayitemsInput";

import { generateUniqueCode } from "@/lib/generateUniqueCode";

export default function NewFarmerForm({ user, updateData = {} }) {
  const initialImageuRL = updateData?.profileImageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageuRL);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
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
    router.push("/login");
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
    const code = generateUniqueCode("EW", data.title);
    data.code = code;
    data.imageUrl = imageUrl;
    data.products = products;
    data.userId = user?.id;
    if (id) {
      makePutRequest(
        setLoading,
        `api/farmers/${id}`,
        data,
        "Farmer",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/farmers",
        data,
        "Farmer",
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
          label="Farmer's Full Name"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Phone"
          name="farmerPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Email Address"
          name="farmerEmail"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Physical Address"
          name="farmerAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person"
          name="farmerContactPerson"
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />
        <TextInput
          label="Farmer's Contact Person Phone"
          name="farmerContactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />
        {/* {Accare} */}
        <TextInput
          label="What is the Size of your Land in Accers"
          name="landSize"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />
        <TextInput
          label="What is your main Crop that you are growing?"
          name="mainCrop"
          type="text"
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />
        <ArrayitemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Product"
        />
        <ImageInput
          label="Farmer Profile Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerProfileUploader"
        />
        <TextareaInput
          label="Farmer's Payment Terms"
          name="farmerPaymentTerms"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <TextareaInput
          label="Notes"
          name="farmerNotes"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <ToggleInput
          label="Farmer Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Farmer" : "Create Farmer"}
        loadingButtonTitle={`${
          id ? "Creating" : "Updating"
        } Farmer please wait...`}
      />
    </form>
  );
}
