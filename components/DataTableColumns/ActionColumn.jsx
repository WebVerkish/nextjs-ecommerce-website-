import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { MoreHorizontal } from "lucide-react";
import { Button } from '../ui/button';
import DeleteButton from '../actions/DeleteButton';
import EditButton from '../actions/EditButton';

export default function ActionColumn({row,title,endpoint,editEndpoint}) {
    const isActive = row.isActive;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><DeleteButton endpoint={endpoint} title={title} /></DropdownMenuItem>
          <DropdownMenuItem><EditButton editEndpoint={editEndpoint} title={title}/></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
