"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { Prisma } from "@prisma/client";
import { signUpSchema } from "@/app/(auth)/auth.schema";

import { signIn } from "../../../auth";
import { prisma } from "../prisma";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

export const register = async (formData: FormData) => {
  "use server";

  let isError = false;

  const formValues = {
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    // parse values through Zod
    const parse = signUpSchema.parse(formValues);

    // check if user already exists
    const alreadyExists = await prisma.user.findUnique({
      where: { email: parse.email },
    });
    if (alreadyExists) {
      isError = true;
      console.error("User already exists");
      return 0;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(parse.password, 10);
    parse.password = hashedPassword;

    // create user
    await prisma.user.create({ data: parse });
  } catch (error) {
    isError = true;
    if (error instanceof z.ZodError) {
      console.error("Validation Error: ", error);
    } else if (error instanceof Error && error.message.includes("bcrypt")) {
      console.error("bcryptjs error: ", error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma known error: ", error);
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error("Prisma unknown error: ", error);
    } else {
      console.error("Unexpected Sign Up error: \n", error);
    }
  } finally {
    // only redirect if sing up is successfull
    if (isError) return;

    // redirect should be in finally block
    // as internally it throws an error
    // doc: https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirect-function
    redirect("/login");
  }
};
