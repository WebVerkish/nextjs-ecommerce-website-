import FormHeader from "@/components/backoffice/FormHeader";
import NewFarmerForm from "@/components/backoffice/NewFarmerForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateFarmer({params:{id}}) {
  const farmer = await getData(`farmers/${id}`);
  const farmerData = farmer.FarmerProfile[0];
  console.log(farmerData.id)
  return (
    <div>
      <FormHeader title="Update Farmer" />
      <NewFarmerForm updateData={farmerData}/>
    </div>
  );
}
