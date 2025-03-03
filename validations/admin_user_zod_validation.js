import { z } from "zod";


export const ZodSignupSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character",
      }),
    firstName: z.string(),
    lastName: z.string(),
  });

  export const ZodSigninSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string(),
  });