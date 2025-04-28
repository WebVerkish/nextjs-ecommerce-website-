import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";

import React from "react";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Coupons() {
  const session = await getServerSession(authOptions);
  if (!session) {
    const coupons = [];
    return null;
  }
  const role = session?.user?.role;
  const id = session?.user?.id;
  const coupons = await getData("coupons");
  const farmerCoupons = coupons.filter((coupon) => coupon.vendorId === id);
  return (
    <div>
      {/* {Header} */}
      <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkTitle="Add Coupon"
      />
      {/* {Table Actions} */}
      {/* {Export || Search || Bulk Actions Delete } */}
      {/* <TableActions/> */}
      <div className="py-6">
        {role === "ADMIN" ? (
          <DataTable data={coupons} columns={columns} />
        ) : (
          <DataTable data={farmerCoupons} columns={columns} />
        )}
      </div>
    </div>
  );
}
