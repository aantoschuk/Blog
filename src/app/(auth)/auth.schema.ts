import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username should be at least 3 characters long.",
  }),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters long.",
  }),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
