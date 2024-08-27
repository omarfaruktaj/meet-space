import { ColumnDef } from "@tanstack/react-table";
import { Slot } from "../../types";
import CellAction from "./cell-action";

export const columns: ColumnDef<Slot>[] = [
  {
    accessorKey: "room.name",
    header: "Room Name",
  },
  {
    accessorKey: "room.roomNo",
    header: "Room No",
  },
  {
    accessorKey: "date",
    header: "Date",
  },

  {
    accessorKey: "startTime",
    header: "Start Time",
  },

  {
    accessorKey: "endTime",
    header: "End Time",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
