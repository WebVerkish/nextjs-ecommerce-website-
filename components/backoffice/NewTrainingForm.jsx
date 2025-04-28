"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import ImageInput from "@/components/formInputs/ImageInput";
import RichTextEditor from "@/components/formInputs/RichText";
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

export default function NewTrainingForm({ categories, updateData = {} }) {
  const initialImageuRL = updateData?.imageUrl ?? "";
  const initialContent = updateData?.content ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageuRL);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(initialContent);

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
    router.push("/dashboard/community");
  }
  async function onSubmit(data) {
    {
      // -id =auto()
      // -title
      // -expertId
      // -category
      // -slug =auto()
      // -description
      // -content
      // -image
    }
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;
    //console.log(data);
    if (id) {
      makePutRequest(
        setLoading,
        `api/trainings/${id}`,
        data,
        "Training",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/trainings",
        data,
        "Training",
        reset,
        redirect
      );
      setImageUrl("");
    }
  }
  return (
    <div>
      <FormHeader title={`${id ? "Updated" : "New"} Training`} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Training Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <TextareaInput
            label="Training Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ImageInput
            label="Training Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="trainingImageUploader"
          />
          <RichTextEditor
            label="Training Content"
            name="content"
            register={register}
            errors={errors}
            onChange={setContent}
            initialContent={content}
          />

          <ToggleInput
            label="Publish your Training"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Training" : "Create Training"}
          loadingButtonTitle={`${
            id ? "Creating" : "Updating"
          } Training please wait...`}
        />
      </form>
    </div>
  );
}
