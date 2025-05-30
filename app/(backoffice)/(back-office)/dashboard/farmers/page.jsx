import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";

import React from "react";
import { columns } from "./columns";

export default async function page() {
  const farmers = await getData("farmers");
  return (
    <div>
      {/* {Header} */}
      <PageHeader
        heading="Farmers"
        href="/register-farmer"
        linkTitle="Add Farmer"
      />
      {/* {Table Actions} */}
      {/* {Export || Search || Bulk Actions Delete } */}
      {/* <TableActions/> */}
      <div className="py-6">
        {/* <DataTable data={farmers} columns={columns} filterKeys={["title"]}/> */}
        {Array.isArray(farmers) && farmers.length > 0 ? (
          <DataTable data={farmers} columns={columns} filterKeys={["title"]} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
  d;
}
