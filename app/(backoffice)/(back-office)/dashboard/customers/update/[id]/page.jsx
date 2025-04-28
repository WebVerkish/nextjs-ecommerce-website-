import FormHeader from "@/components/backoffice/FormHeader";
import NewCustomerForm from "@/components/backoffice/NewCustomerForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateCustomer({params:{id}}) {
  const customer = await getData(`customers/${id}`);
  const customerData = customer;
  console.log(customerData)
  return (
    <div>
      <FormHeader title="Update Customer" />
      <NewCustomerForm updateData={customerData}/>
    </div>
  );
}
