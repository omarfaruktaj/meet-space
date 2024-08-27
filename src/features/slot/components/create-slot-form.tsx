import { Response } from "@/types";
import { TSlotFormSchema } from "../validation-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slot } from "../types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/back-button";
import SlotForm from "./slot-form";
import { useCreateSlotMutation } from "../slotApi";

export default function CreateSlotForm() {
  const [createSlot, { isLoading }] = useCreateSlotMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: TSlotFormSchema) => {
    try {
      const res = (await createSlot(data)) as Response<Slot>;
      if (res.error) {
        toast.error(
          res.error.data.message || "Failed to create Slots. Please try again."
        );
      } else {
        toast.success("Slots created successfully!");
        navigate("/dashboard/slots");
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Create Slot failed:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <BackButton />
      <div className="my-6">
        <Card className=" max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Add a New Slots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SlotForm handleSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
