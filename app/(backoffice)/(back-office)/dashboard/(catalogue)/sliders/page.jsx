
import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";

import React from "react";
import { columns } from "./columns";

export default async function page() {
  const sliders = await getData("sliders");
  return (
    <div>
      {/* {Header} */}
      <PageHeader heading="Sliders" href="/dashboard/sliders/new" linkTitle="Add Banner"/>
      {/* {Table Actions} */}
      {/* {Export || Search || Bulk Actions Delete } */}
      {/* <TableActions/> */}
      <div className="py-6">
        <DataTable data={sliders} columns={columns}/>
      </div>
    </div>
  );
}
