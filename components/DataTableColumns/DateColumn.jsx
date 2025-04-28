import React from "react";

export default function DateColumn({row,accessorKey}) {
  const isoDate = row.getValue(`${accessorKey}`);
  const normalDate = new Date(isoDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   timeZoneName: "short"
  });
  return <div className="font-medium">{normalDate}</div>;
}
