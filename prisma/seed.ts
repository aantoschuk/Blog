import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

async function main() {
  let password = "12345678";
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: "hutir.gaming@gmail.com",
      name: "Alexander",
      username: "Alex_",
      password: hashedPassword,
      role: "admin",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
