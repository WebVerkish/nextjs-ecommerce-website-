
// import PageHeader from "@/components/backoffice/PageHeader";
// import TableActions from "@/components/backoffice/TableActions";
// import { DataTable } from "@/components/data-table-components/DataTable";
// import { getData } from "@/lib/getData";

// import React from "react";
// import { columns } from "./columns";

// export default async function page() {
//   const sliders = await getData("sliders");
//   return (
//     <div>
//       {/* {Header} */}
//       <PageHeader heading="Sliders" href="/dashboard/sliders/new" linkTitle="Add Banner"/>
//       {/* {Table Actions} */}
//       {/* {Export || Search || Bulk Actions Delete } */}
//       {/* <TableActions/> */}
//       <div className="py-6">
//         <DataTable data={sliders} columns={columns}/>
//       </div>
//     </div>
//   );
// }
import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

export default async function SlidersPage() {
    const sliders = await getData("sliders");
    const data = Array.isArray(sliders) ? sliders : [];
    console.log('Sliders data:', data); // Debug log

    return (
        <div>
            <PageHeader
                heading="Sliders"
                href="/dashboard/sliders/new"
                linkTitle="Add Banner"
            />
            <div className="py-6">
                {data.length > 0 ? (
                    <DataTable data={data} columns={columns} />
                ) : (
                    <p className="text-center text-gray-500">No sliders available</p>
                )}
            </div>
        </div>
    );
}