"use client";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextInput from "@/components/formInputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateOnboardingFormData } from "@/redux/slices/onboardingSlice";

export default function BasicInformationForm() {
  const [loading, setLoading] = useState(false);
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const existingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );
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
    console.log(data);
    dispatch(updateOnboardingFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }
  
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Basic Information Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />
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
      </div>
      <NavButtons />
    </form>
  );
}
