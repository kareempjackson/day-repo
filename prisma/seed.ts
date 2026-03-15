import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create modifiers
  const extraShot = await prisma.modifier.upsert({
    where: { id: 'mod-extra-shot' },
    update: {},
    create: {
      id: 'mod-extra-shot',
      name: 'Extra Shot',
      price: 0.75,
      available: true,
    },
  });

  const oatMilk = await prisma.modifier.upsert({
    where: { id: 'mod-oat-milk' },
    update: {},
    create: {
      id: 'mod-oat-milk',
      name: 'Oat Milk',
      price: 0.60,
      available: true,
    },
  });

  const almondMilk = await prisma.modifier.upsert({
    where: { id: 'mod-almond-milk' },
    update: {},
    create: {
      id: 'mod-almond-milk',
      name: 'Almond Milk',
      price: 0.60,
      available: true,
    },
  });

  const vanilla = await prisma.modifier.upsert({
    where: { id: 'mod-vanilla' },
    update: {},
    create: {
      id: 'mod-vanilla',
      name: 'Vanilla Syrup',
      price: 0.50,
      available: true,
    },
  });

  const caramel = await prisma.modifier.upsert({
    where: { id: 'mod-caramel' },
    update: {},
    create: {
      id: 'mod-caramel',
      name: 'Caramel Syrup',
      price: 0.50,
      available: true,
    },
  });

  const whippedCream = await prisma.modifier.upsert({
    where: { id: 'mod-whipped-cream' },
    update: {},
    create: {
      id: 'mod-whipped-cream',
      name: 'Whipped Cream',
      price: 0.50,
      available: true,
    },
  });

  // Create menu items with modifiers
  await prisma.menuItem.upsert({
    where: { id: 'item-espresso' },
    update: {},
    create: {
      id: 'item-espresso',
      name: 'Espresso',
      description: 'Rich, full-bodied espresso shot',
      price: 2.50,
      category: 'Coffee',
      available: true,
      modifiers: {
        create: [
          { modifierId: extraShot.id },
        ],
      },
    },
  });

  await prisma.menuItem.upsert({
    where: { id: 'item-latte' },
    update: {},
    create: {
      id: 'item-latte',
      name: 'Latte',
      description: 'Espresso with steamed milk',
      price: 4.50,
      category: 'Coffee',
      available: true,
      modifiers: {
        create: [
          { modifierId: extraShot.id },
          { modifierId: oatMilk.id },
          { modifierId: almondMilk.id },
          { modifierId: vanilla.id },
          { modifierId: caramel.id },
        ],
      },
    },
  });

  await prisma.menuItem.upsert({
    where: { id: 'item-cappuccino' },
    update: {},
    create: {
      id: 'item-cappuccino',
      name: 'Cappuccino',
      description: 'Espresso with steamed milk foam',
      price: 4.00,
      category: 'Coffee',
      available: true,
      modifiers: {
        create: [
          { modifierId: extraShot.id },
          { modifierId: oatMilk.id },
          { modifierId: almondMilk.id },
          { modifierId: vanilla.id },
        ],
      },
    },
  });

  await prisma.menuItem.upsert({
    where: { id: 'item-mocha' },
    update: {},
    create: {
      id: 'item-mocha',
      name: 'Mocha',
      description: 'Espresso with chocolate and steamed milk',
      price: 5.00,
      category: 'Coffee',
      available: true,
      modifiers: {
        create: [
          { modifierId: extraShot.id },
          { modifierId: oatMilk.id },
          { modifierId: almondMilk.id },
          { modifierId: whippedCream.id },
        ],
      },
    },
  });

  await prisma.menuItem.upsert({
    where: { id: 'item-croissant' },
    update: {},
    create: {
      id: 'item-croissant',
      name: 'Butter Croissant',
      description: 'Flaky, buttery pastry',
      price: 3.50,
      category: 'Pastry',
      available: true,
    },
  });

  await prisma.menuItem.upsert({
    where: { id: 'item-muffin' },
    update: {},
    create: {
      id: 'item-muffin',
      name: 'Blueberry Muffin',
      description: 'Fresh-baked muffin with blueberries',
      price: 3.00,
      category: 'Pastry',
      available: true,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
