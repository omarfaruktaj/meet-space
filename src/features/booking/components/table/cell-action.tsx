import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Trash,
  CheckCircle,
  XCircle as CancelCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-model";
import { useState } from "react";
import { Response } from "@/types";
import { toast } from "sonner";
import {
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
} from "../../bookingApi";
import { Booking } from "../../types";

export default function CellAction({ data }: { data: Booking }) {
  const [openModel, setOpenModel] = useState(false);

  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const handleDelete = async () => {
    try {
      const res = (await deleteBooking(data._id)) as Response<Booking>;
      if (res.error) {
        toast.error(
          res.error.data.message || "Booking delete failed. Please try again."
        );
      } else {
        toast.success("Booking deleted successfully");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Booking delete Failed:", error);
    }
  };

  const handleStatusChange = async (
    status: "confirmed" | "unconfirmed" | "canceled"
  ) => {
    try {
      const res = (await updateBookingStatus({
        id: data._id,
        status,
      })) as Response<Booking>;
      if (res.error) {
        toast.error(
          res.error.data.message || "Status update failed. Please try again."
        );
      } else {
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Status update Failed:", error);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openModel}
        onClose={() => setOpenModel(false)}
        onConfirm={handleDelete}
      />

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

          <DropdownMenuItem
            disabled={data.isConfirmed === "confirmed"}
            className="cursor-pointer"
            onClick={() => handleStatusChange("confirmed")}
          >
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="ml-2">Approve</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            disabled={data.isConfirmed === "unconfirmed"}
            className="cursor-pointer"
            onClick={() => handleStatusChange("unconfirmed")}
          >
            <XCircle className="h-5 w-5 text-gray-500" />
            <span className="ml-2">Mark as Unconfirmed</span>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            disabled={data.isConfirmed === "canceled"}
            className="cursor-pointer"
            onClick={() => handleStatusChange("canceled")}
          >
            <CancelCircle className="h-5 w-5 text-red-500 " />
            <span className="ml-2">Reject</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenModel(true)}
          >
            <Trash className="h-5 w-5 text-rose-500" />
            <span className="ml-2 text-rose-500">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
