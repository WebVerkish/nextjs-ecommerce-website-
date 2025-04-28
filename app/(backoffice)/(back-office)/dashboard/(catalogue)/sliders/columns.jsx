"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { ArrowUpDown } from "lucide-react";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
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
    accessorKey: "imageUrl",
    header: "Banner Image",
    cell: ({ row }) => (<ImageColumn row={row} imageTitle="imageUrl"/>)
  },
  {
    accessorKey: "link",
    header: "Banner Link",
    cell: ({ row }) => {
      const link = row.getValue("link");
      return <div className="line-clamp-1">{link}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "isActive",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) =>(<DateColumn row={row} accessorKey="createdAt"/>)
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) =>{
      const slider = row.original;
      return (<ActionColumn row={row} title="Banner" editEndpoint={`sliders/update/${slider.id}`} endpoint={`sliders/${slider.id}`}/>)
    } 
  },
];
