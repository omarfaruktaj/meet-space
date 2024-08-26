import { Response } from "@/types";
import { useCreateRoomMutation } from "../roomApi";
import { TRoomFormSchema } from "../validation-schema";
import RoomForm from "./room-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Room } from "../types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/back-button";

export default function CreateRoomForm() {
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: TRoomFormSchema) => {
    try {
      const res = (await createRoom(data)) as Response<Room>;
      if (res.error) {
        toast.error(
          res.error.data.message || "Failed to create room. Please try again."
        );
      } else {
        toast.success("Room created successfully!");
        navigate("/dashboard/rooms");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Create Room failed:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <BackButton />
      <div className="my-6">
        <Card className=" max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Add a New Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RoomForm handleSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
