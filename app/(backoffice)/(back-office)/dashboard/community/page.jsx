
// import PageHeader from "@/components/backoffice/PageHeader";
// import TableActions from "@/components/backoffice/TableActions";
// import { DataTable } from "@/components/data-table-components/DataTable";
// import { getData } from "@/lib/getData";

// import React from "react";
// import { columns } from "./columns";

// export default async function page() {
//   const trainings = await getData("trainings");
//   return (
//     <div>
//       {/* {Header} */}
//       <PageHeader heading="Ecom Community Trainings" href="/dashboard/community/new" linkTitle="Add Training"/>
//       {/* {Table Actions} */}
//       {/* {Export || Search || Bulk Actions Delete } */}
//       {/* <TableActions/> */}
//       <div className="py-6">
//        <DataTable data={trainings} columns={columns}/>
//       </div>
//     </div>
//   );
// }
import PageHeader from "@/components/backoffice/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
 import React from "react";
 
export default async function CommunityPage() {
    const trainings = await getData("trainings");
    const data = Array.isArray(trainings) ? trainings : [];
    console.log('Trainings data:', data); // Debug log

    return (
        <div>
            <PageHeader
                heading="Ecom Community Trainings"
                href="/dashboard/community/new"
                linkTitle="Add Training"
            />
            <div className="py-6">
                {data.length > 0 ? (
                    <DataTable data={data} columns={columns} />
                ) : (
                    <p className="text-center text-gray-500">No trainings available</p>
                )}
            </div>
        </div>
    );
}