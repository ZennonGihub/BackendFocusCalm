import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rolesData = [{ name: "user" }, { name: "admin" }];

  for (const role of rolesData) {
    const r = await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: { name: role.name },
    });
  }

  const statusData = [
    { name: "pendiente" },
    { name: "en prograso" },
    { name: "finalizada" },
    { name: "pausada" },
  ];

  for (const status of statusData) {
    const s = await prisma.status.upsert({
      where: { name: status.name },
      update: {},
      create: { name: status.name },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
