import { z } from "zod";

const timeSchema = z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
  message: "Invalid time format, must be HH:mm",
});

export const slotFormSchema = z
  .object({
    date: z.date({
      required_error: "A date of slots is required.",
    }),
    room: z.string().min(1, { message: "Room cannot be empty." }),
    startTime: timeSchema,
    endTime: timeSchema,
  })
  .refine(
    (data) => {
      const startTime = data.startTime;
      const endTime = data.endTime;

      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;

      return endTotalMinutes > startTotalMinutes;
    },
    {
      message: "End time must be after start time.",
      path: ["endTime"],
    }
  );

export type TSlotFormSchema = z.infer<typeof slotFormSchema>;
