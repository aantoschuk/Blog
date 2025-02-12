import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username should be at least 3 characters long.",
  }),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters long.",
  }),
});
