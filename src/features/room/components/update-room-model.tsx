import { Dialog, DialogContent } from "@/components/ui/dialog";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Room } from "../types";
import RoomForm from "./room-form";
import { TRoomFormSchema } from "../validation-schema";
interface UpdateRoomModelProps {
  onSubmit: (data: TRoomFormSchema) => void;
  isOpen: boolean;
  onClose: () => void;
  data: Room;
  isLoading: boolean;
}
export default function UpdateRoomModel({
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogTitle className="text-center text-xl">Updata Room</DialogTitle>
        <RoomForm
          handleSubmit={onSubmit}
          isLoading={isLoading}
          initialData={data}
        />
      </DialogContent>
    </Dialog>
  );
}
