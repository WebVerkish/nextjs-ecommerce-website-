"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) =>(<SortableColumn column={column} title="Name"/>)
  },
  // {
  //   accessorKey: "profileImageUrl",
  //   header: "Farmer Image",
  //   cell: ({ row }) => (<ImageColumn row={row} imageTitle="profileImageUrl"/>)
  // },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email");
      return <div className="line-clamp-1">{email}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      return <div className="line-clamp-1">{role}</div>;
    },
  },
  // {
  //   accessorKey: "farmerPhone",
  //   header: "Farmer Phone",
  //   cell: ({ row }) => {
  //     const farmerPhone = row.getValue("farmerPhone");
  //     return <div className="line-clamp-1">{farmerPhone}</div>;
  //   },
  // },
  // {
  //   accessorKey: "farmerAddress",
  //   header: "Farmer Address",
  //   cell: ({ row }) => {
  //     const farmerAddress = row.getValue("farmerAddress");
  //     return <div className="line-clamp-1">{farmerAddress}</div>;
  //   },
  // },
  // {
  //   accessorKey: "farmerContactPerson",
  //   header: "Farmer Contact Person",
  //   cell: ({ row }) => {
  //     const farmerContactPerson = row.getValue("farmerContactPerson");
  //     return <div className="line-clamp-1">{farmerContactPerson}</div>;
  //   },
  // },
  // {
  //   accessorKey: "farmerContactPersonPhone",
  //   header: "Farmer Contact Person Phone number",
  //   cell: ({ row }) => {
  //     const farmerContactPersonPhone = row.getValue("farmerContactPersonPhone");
  //     return <div className="line-clamp-1">{farmerContactPersonPhone}</div>;
  //   },
  // },
  // {
  //   accessorKey: "farmerPaymentTerms",
  //   header: "Farmer Payment terms",
  //   cell: ({ row }) => {
  //     const farmerPaymentTerms = row.getValue("farmerPaymentTerms");
  //     return <div className="line-clamp-1">{farmerPaymentTerms}</div>;
  //   },
  // },
  // {
  //   accessorKey: "isActive",
  //   header: "Active",
  // },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (<DateColumn row={row} accessorKey="createdAt"/>)
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) =>{
      const customer = row.original;
      return (<ActionColumn row={row} title="Customer" editEndpoint={`customers/update/${customer.id}`} endpoint={`customers/${customer.id}`}/>)
    } 
  },
];
