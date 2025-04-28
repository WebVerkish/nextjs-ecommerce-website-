import FormHeader from "@/components/backoffice/FormHeader";
import NewSliderForm from "@/components/backoffice/Forms/NewSliderForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateSlider({ params: { id } }) {
  const banner = await getData(`sliders/${id}`);
  console.log(banner);
  return (
    <div>
      <FormHeader title="Update Banner" />
      <NewSliderForm updateData={banner}/>
    </div>
  );
}
