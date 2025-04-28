
import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns"

import React from "react";

export default async function page() {
  const categories = await getData("categories");
  return (
    <div>
      {/* {Header} */}
      <PageHeader heading="Categories" href="/dashboard/categories/new" linkTitle="Add Category"/>
      {/* {Table Actions} */}
      {/* {Export || Search || Bulk Actions Delete } */}
      {/* <TableActions/> */}
      <div className="py-6">
        <DataTable data={categories} columns={columns}/>
      </div>
    </div>
  );
}
