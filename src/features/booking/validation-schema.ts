import { z } from "zod";

const UserInfoSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  phone: z
    .string({
      required_error: "Phone is required",
    })
    .regex(/^\+?[0-9][0-9- ]{6,14}[0-9]$/, {
      message: "Invalid phone number",
    }),
  address: z.string(),
});
export const BookingProcessFormSchema = z.object({
  date: z.date({
    required_error: "A date of slots is required.",
  }),
  slots: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, { message: "At least one slot must be selected." }),

  userInfo: UserInfoSchema,
});

export type TBookingProcessFormSchema = z.infer<
  typeof BookingProcessFormSchema
>;
