
import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";

import React from "react";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Product from "@/components/frontend/Product";

export default async function page() {
    const session = await getServerSession(authOptions);
    if(!session){
      const products =[];
      return null;
    }
    const role = session?.user?.role;
    const products = await getData("products");
    const id =session?.user?.id;
    console.log(id);
    const farmerProducts = products.filter((Product)=> Product.userId === id);
  return (
    <div>
      {/* {Header} */}
      <PageHeader heading="Products" href="/dashboard/products/new" linkTitle="Add Product"/>
      {/* {Table Actions} */}
      {/* {Export || Search || Bulk Actions Delete } */}
      {/* <TableActions/> */}
      <div className="py-6">
         {
            role === "ADMIN"?(<DataTable data={products} columns={columns}/>):
            (<DataTable data={farmerProducts} columns={columns}/>)
         }
      </div>
    </div>
  );
}
