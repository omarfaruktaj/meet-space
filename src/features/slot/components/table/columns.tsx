import { ColumnDef } from "@tanstack/react-table";
import { Slot } from "../../types";
import CellAction from "./cell-action";
import { convertTime24to12 } from "@/utils/format-time-24-to-12";

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
    id: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      return <div>{convertTime24to12(row.original.startTime)}</div>;
    },
  },

  {
    id: "endTime",
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      return <div>{convertTime24to12(row.original.endTime)}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
