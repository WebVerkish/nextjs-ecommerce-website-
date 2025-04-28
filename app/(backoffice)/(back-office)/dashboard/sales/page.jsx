
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
    const sales = await getData("sales");
    const id =session?.user?.id;
    console.log(id);
    // Fetch all the sales
    // Filter by vendorId => to get sales for this vendor
    // fetch order by ID
    // customer name,email,phone,orderNumber
    const farmerSales = sales.filter((sale)=> sale.vendorId === id);
  return (
    <div>
      {/* {Header} */}
      {/* <PageHeader heading="Products" href="/dashboard/products/new" linkTitle="Add Product"/> */}
      {/* {Table Actions} */}
      {/* {Export || Search || Bulk Actions Delete } */}
      {/* <TableActions/> */}
      <div className="py-6">
         {
            role === "ADMIN"?(<DataTable data={sales} columns={columns}/>):
            (<DataTable data={farmerSales} columns={columns}/>)
         }
      </div>
    </div>
  );
}
