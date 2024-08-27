import { ColumnDef } from "@tanstack/react-table";
import { Room } from "../types";
import CellAction from "./cell-action";

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "name",
    header: "Room Name",
  },
  {
    accessorKey: "roomNo",
    header: "Room No",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "pricePerSlot",
    header: "Price Per Slot",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("pricePerSlot"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
