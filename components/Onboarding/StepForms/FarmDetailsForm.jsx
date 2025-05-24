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

export default function FarmDetailsForm() {
  const [loading, setLoading] = useState(false);
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const existingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );
  const [products, setProducts] = useState([]);
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
    data.products = products;
    dispatch(updateOnboardingFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Farm Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
      </div>
      <NavButtons />
    </form>
  );
}
