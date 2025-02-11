"use server";

import { prisma } from "../prisma";

export async function fetchUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("failed to fetch users");
  }
}
