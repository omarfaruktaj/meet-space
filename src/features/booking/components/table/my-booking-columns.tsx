import { ColumnDef } from "@tanstack/react-table";
import { Booking } from "../../types";
import { Slot } from "@/features/slot/types";
import { Badge } from "@/components/ui/badge";
import { convertTime24to12 } from "@/utils/format-time-24-to-12";

export const myBookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "room.name",
    header: "Room Name",
  },

  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "time",
    header: "Time",
    cell: ({ row }) => {
      return row.original.slots.map((slot: Slot, index: number) => (
        <div key={index}>
          {convertTime24to12(slot.startTime)} -{" "}
          {convertTime24to12(slot.endTime)}
        </div>
      ));
    },
  },
  {
    accessorKey: "isConfirmed",
    header: "Status",
    cell: ({ cell }) => {
      const status = cell.getValue<string>();
      const variant =
        status === "confirmed"
          ? "default"
          : status === "unconfirmed"
          ? "outline"
          : "destructive";
      const label = status.charAt(0).toUpperCase() + status.slice(1);

      return <Badge variant={variant}>{label}</Badge>;
    },
  },
];
