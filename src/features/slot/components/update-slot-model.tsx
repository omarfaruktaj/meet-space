import { Dialog, DialogContent } from "@/components/ui/dialog";

import { DialogTitle } from "@radix-ui/react-dialog";
import SlotForm from "./slot-form";
import { Slot } from "../types";
import { TSlotFormSchema } from "../validation-schema";
interface UpdateRoomModelProps {
  onSubmit: (data: TSlotFormSchema) => void;
  isOpen: boolean;
  onClose: () => void;
  data: Slot;
  isLoading: boolean;
}
export default function UpdateSlotModel({
  data,
  isOpen,
  onSubmit,
  onClose,
  isLoading,
}: UpdateRoomModelProps) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const updateSlotData = {
    _id: data._id,
    room: data.room._id, // Extract only the _id from the room property
    date: data.date,
    startTime: data.startTime,
    endTime: data.endTime,
    isBooked: data.isBooked,
    __v: data.__v,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogTitle className="text-center text-xl">Updata Room</DialogTitle>
        <SlotForm
          handleSubmit={onSubmit}
          isLoading={isLoading}
          initialData={updateSlotData}
        />
      </DialogContent>
    </Dialog>
  );
}
