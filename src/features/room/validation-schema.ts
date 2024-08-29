import { z } from "zod";

export const roomFormSchema = z.object({
  name: z
    .string({ required_error: "Please provide a room name" })
    .min(2, { message: "Room name must be at least 2 characters long" }),
  roomNo: z.coerce
    .number({ required_error: "Room number is required" })
    .min(1, { message: "Room number must be at least 1" }),
  floorNo: z.coerce
    .number()
    .int()
    .min(1, { message: "Floor must be greater than 0" }),
  capacity: z.coerce
    .number({ required_error: "Capacity is required" })
    .min(1, { message: "Capacity must be greater than 0" }),
  pricePerSlot: z.coerce
    .number({ required_error: "Price per slot is required" })
    .positive({ message: "Price per slot must be positive" }),
  amenities: z.array(z.string()),
  images: z.array(z.string()).nonempty(),
});

export type TRoomFormSchema = z.infer<typeof roomFormSchema>;
