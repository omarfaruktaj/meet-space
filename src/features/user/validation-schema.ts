import { z } from "zod";

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter your name." })
    .min(3, { message: "Your name must be at least 3 characters long." }),

  email: z
    .string()
    .min(1, { message: "Please provide your email address." })
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(1, { message: "Please create a password." })
    .min(6, { message: "Your password must be at least 6 characters long." })
    .max(50, { message: "Your password cannot be longer than 50 characters." }),

  phone: z
    .string()
    .min(1, { message: "Please enter your phone number." })
    .regex(/^\+?[0-9][0-9- ]{6,14}[0-9]$/, {
      message: "Please enter a valid phone number.",
    }),

  address: z.string().min(1, { message: "Please provide your address." }),
});

export type TSignupFormSchema = z.infer<typeof signupFormSchema>;
