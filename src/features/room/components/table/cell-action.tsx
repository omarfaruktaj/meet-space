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
import { useDeleteRoomMutation } from "../../roomApi";
import { Room } from "../../types";

export default function CellAction({ data }: { data: Room }) {
  const [openModel, setOpenModel] = useState(false);

  const [deleteRoom] = useDeleteRoomMutation();

  const handleDelete = async () => {
    try {
      const res = (await deleteRoom(data._id)) as Response<Room>;
      if (res.error) {
        toast.error(
          res.error.data.message || "Room delete failed. Please try again."
        );
      } else {
        toast.success("Room deleted successfully");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Room delete Failed:", error);
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
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
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
