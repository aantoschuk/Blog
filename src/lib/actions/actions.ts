"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { signUpSchema } from "@/app/(auth)/auth.schema";

import { signIn } from "../../../auth";
import { prisma } from "../prisma";
import { ErrorCode, errorMap } from "../errorExceptions";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // avoid redirect inside signIn as i wrap it trycatch
    await signIn("credentials", {
      redirect: false,
      password: formData.get("password"),
      email: formData.get("email"),
    });
  } catch (error) {
    console.error("Error in Auth: \n", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default: {
          return "Something went wrong";
        }
      }
    }
    throw error;
  } finally {
    // redirect always should be in finally block
    // as internally it throws an error
    redirect("/");
  }
}

export const register = async (
  prevState: string | undefined,
  formData: FormData,
) => {
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
      return "Already exists";
    }

    // hash password
    const hashedPassword = await bcrypt.hash(parse.password, 10);
    parse.password = hashedPassword;

    // create user
    await prisma.user.create({ data: parse });

    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((issue) => issue.message);
      return messages;
    }
    console.log("Error: \n", error);
    return errorMap[ErrorCode.UnknownError].message;
  }
};
