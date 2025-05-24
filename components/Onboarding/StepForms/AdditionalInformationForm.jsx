"use client";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextInput from "@/components/formInputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";
import ArrayitemsInput from "@/components/formInputs/ArrayitemsInput";
import ImageInput from "@/components/formInputs/ImageInput";
import TextareaInput from "@/components/formInputs/TextAreaInput";

export default function AdditionalInformationForm() {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const existingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );
  const [imageUrl, setImageUrl] = useState();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData,
    },
  });
  const dispatch = useDispatch();
  async function processData(data) {
    data.imageUrl = imageUrl;
    console.log(data);
    dispatch(updateOnboardingFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Additional Information Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
      </div>
      <NavButtons />
    </form>
  );
}
