import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const baristaPassword = await bcrypt.hash('barista123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@coffeeshop.com' },
    update: {},
    create: {
      email: 'admin@coffeeshop.com',
      password: adminPassword,
      name: 'Admin User',
      role: Role.ADMIN,
    },
  });

  const barista1 = await prisma.user.upsert({
    where: { email: 'barista1@coffeeshop.com' },
    update: {},
    create: {
      email: 'barista1@coffeeshop.com',
      password: baristaPassword,
      name: 'John Barista',
      role: Role.BARISTA,
      pin: '1234',
    },
  });

  const barista2 = await prisma.user.upsert({
    where: { email: 'barista2@coffeeshop.com' },
    update: {},
    create: {
      email: 'barista2@coffeeshop.com',
      password: baristaPassword,
      name: 'Jane Barista',
      role: Role.BARISTA,
      pin: '5678',
    },
  });

  console.log('Seeded users:', { admin, barista1, barista2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
