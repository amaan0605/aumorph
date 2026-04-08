import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with AUMorph catalog...');

  // Create an explicit Admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@aumorph.com' },
    update: {},
    create: {
      email: 'admin@aumorph.com',
      name: 'AUMorph Admin',
      passwordHash,
      role: 'ADMIN'
    }
  });
  console.log('Admin user ensured: admin@aumorph.com / admin123');

  const products = [
    {
      name: 'Torii Light',
      price: 240.0,
      description: 'Inspired by the iconic Torii gates of Japan, this piece reflects the transition between spaces — from the external world into a place of calm.\n\nIts form captures simplicity, while its light creates warmth that quietly fills the room.',
      stock: 50,
      imageUrl: '/torii_light.png'
    },
    {
      name: 'Kyoto Glow',
      price: 190.0,
      description: 'Drawn from the serene nights of Kyoto, where light gently spills through wooden structures and narrow streets.\n\nThis piece is designed to recreate that quiet warmth — subtle, ambient, and deeply calming.',
      stock: 35,
      imageUrl: '/kyoto_glow.png'
    }
  ];

  for (const p of products) {
    // Basic check to prevent duplication on multiple seed runs
    const existing = await prisma.product.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.product.create({ data: p });
    }
  }

  console.log('Products seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
