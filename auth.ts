import NextAuth from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";

async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // @ts-ignore
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({
              email: z.string().email(),
              password: z.string().min(8),
            })
            .safeParse(credentials);
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUserByEmail(email);
            if (!user) return null;
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) return user;
          }
          console.log("Invalid credentials");
          return null;
        } catch (error) {
          console.error("Authorize error: \n", error);
          return null;
        }
      },
    }),
  ],
});
