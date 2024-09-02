import { z } from "zod";

export const roomFormSchema = z.object({
  name: z
    .string({ required_error: "Please provide a room name" })
    .min(2, { message: "Room name must be at least 2 characters long" }),
  description: z
    .string({ required_error: "Please provide a room description" })
    .min(2, { message: "Room description must be at least 2 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),

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
  amenities: z
    .array(z.string())
    .min(2, { message: "At least two amenity is required" }),
  images: z
    .array(z.string())
    .min(3, { message: "At least 3 images are required" }),
});

export type TRoomFormSchema = z.infer<typeof roomFormSchema>;
