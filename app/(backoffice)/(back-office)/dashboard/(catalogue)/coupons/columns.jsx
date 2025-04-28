"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";

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
    accessorKey: "title",
    header: ({ column }) => (<SortableColumn column={column} title="Title"/>),
  },
  {
    accessorKey: "couponCode",
    header: "Coupon Code",
    cell: ({ row }) => {
      const couponCode = row.getValue("couponCode");
      return <div className="line-clamp-1">{couponCode}</div>;
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (<DateColumn row={row} accessorKey="expiryDate"/>)
  },
  {
    accessorKey: "isActive",
    header: "isActive",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (<DateColumn row={row} accessorKey="createdAt"/>)
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) =>{
      const coupon = row.original;
      return (<ActionColumn row={row} title="Coupon" editEndpoint={`coupons/update/${coupon.id}`} endpoint={`coupons/${coupon.id}`}/>)
    } 
  },
];
