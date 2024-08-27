import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-model";
import { useState } from "react";
import { Response } from "@/types";
import { toast } from "sonner";
import { Slot } from "../../types";
import { useDeleteSlotsMutation, useUpdateSlotsMutation } from "../../slotApi";
import { TSlotFormSchema } from "../../validation-schema";
import UpdateSlotModel from "../update-slot-model";

export default function CellAction({ data }: { data: Slot }) {
  const [openModel, setOpenModel] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const [deleteSlot] = useDeleteSlotsMutation();
  const [updateSlot, { isLoading }] = useUpdateSlotsMutation();

  const handleDelete = async () => {
    try {
      const res = (await deleteSlot(data._id)) as Response<Slot>;
      if (res.error) {
        toast.error(
          res.error.data.message || "Slot delete failed. Please try again."
        );
      } else {
        toast.success("Slot deleted successfully");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Slot delete Failed:", error);
    }
  };
  const handleRoomUpdate = async (SlotDate: TSlotFormSchema) => {
    try {
      const res = (await updateSlot({
        id: data._id,
        data: SlotDate,
      })) as Response<TSlotFormSchema>;
      if (res.error) {
        toast.error(
          res.error.data.message || "Slot update failed. Please try again."
        );
      } else {
        toast.success("Slot update successfully");
      }
      setOpenUpdateModel(false);
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Slot update Failed:", error);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openModel}
        onClose={() => setOpenModel(false)}
        onConfirm={handleDelete}
      />
      <UpdateSlotModel
        data={data}
        isLoading={isLoading}
        onClose={() => setOpenUpdateModel(false)}
        isOpen={openUpdateModel}
        onSubmit={handleRoomUpdate}
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
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem
            onClick={() => setOpenUpdateModel(true)}
            className="cursor-pointer"
          >
            <Edit className="h-5 w-5" />

            <span className="ml-2">Edit</span>
          </DropdownMenuItem>

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
