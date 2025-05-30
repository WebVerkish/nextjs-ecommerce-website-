
import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";

import React from "react";
import { columns } from "./columns";

export default async function page() {
  const markets = (await getData("markets"))??[];
  return (
    <div>
      {/* {Header} */}
      <PageHeader heading="Markets" href="/dashboard/markets/new" linkTitle="Add Market"/>
      {/* {Table Actions} */}
      {/* {Export || Search || Bulk Actions Delete } */}
      {/* <TableActions/> */}
      <div className="py-6">
        <DataTable data={markets} columns={columns}/>
      </div>
    </div>
  );
}
