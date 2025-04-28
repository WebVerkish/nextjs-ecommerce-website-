import FormHeader from "@/components/backoffice/FormHeader";
import NewFarmerForm from "@/components/backoffice/NewFarmerForm";
import React from "react";
export default function page() {
  return (
    <div>
      <FormHeader title="New Farmer" />
      <NewFarmerForm/>
    </div>
  );
}
