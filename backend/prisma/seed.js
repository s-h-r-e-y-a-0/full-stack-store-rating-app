import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const adminHash = await bcrypt.hash("Admin@123", 10);
  const ownerHash = await bcrypt.hash("Owner@123", 10);
  const userHash = await bcrypt.hash("User@123", 10);

  // System Administrator
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { name: "System Administrator Example Name" },
    create: {
      name: "System Administrator Example Name",
      email: "admin@example.com",
      password: adminHash,
      address: "Head Office Address",
      role: Role.ADMIN,   // ✅ enum usage
    },
  });

  // Store Owner
  await prisma.user.upsert({
    where: { email: "owner@example.com" },
    update: { name: "John StoreOwner" },
    create: {
      name: "John StoreOwner",
      email: "owner@example.com",
      password: ownerHash,
      address: "123 Store St",
      role: Role.OWNER,   // ✅ enum usage
    },
  });

  // Normal User
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: { name: "Jane NormalUser" },
    create: {
      name: "Jane NormalUser",
      email: "user@example.com",
      password: userHash,
      address: "456 User Ave",
      role: Role.USER,   // ✅ enum usage
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
