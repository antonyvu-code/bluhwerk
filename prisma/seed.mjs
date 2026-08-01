import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PLANTS } from '../lib/plants.js';
import { REVIEWS } from '../lib/content.js';

const prisma = new PrismaClient();

async function main() {
  // Demo-Konto
  const passwordHash = bcrypt.hashSync('gaertnerei', 10);
  const demo = await prisma.user.upsert({
    where: { email: 'demo@bluhwerk.de' },
    update: {},
    create: { email: 'demo@bluhwerk.de', name: 'Demo Gärtner:in', passwordHash },
  });

  // Produkte
  for (const p of PLANTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        category: p.category, name: p.name, sci: p.sci, price: p.price, care: p.care,
        light: p.light, water: p.water, difficulty: p.difficulty, height: p.height, origin: p.origin,
        img: p.img, imgDetail: p.imgDetail, imgRoom: p.imgRoom, personality: p.personality, steckbrief: p.steckbrief,
      },
      create: {
        slug: p.slug, category: p.category, name: p.name, sci: p.sci, price: p.price, care: p.care,
        light: p.light, water: p.water, difficulty: p.difficulty, height: p.height, origin: p.origin,
        img: p.img, imgDetail: p.imgDetail, imgRoom: p.imgRoom, personality: p.personality, steckbrief: p.steckbrief,
      },
    });
  }

  // Bewertungen (nur einmal seeden)
  const existing = await prisma.review.count();
  if (existing === 0) {
    for (const r of REVIEWS) {
      const product = await prisma.product.findFirst({ where: { name: r.plant } });
      await prisma.review.create({
        data: {
          name: r.name, city: r.city, plant: r.plant, rating: r.rating, text: r.text,
          createdAt: new Date(r.date),
          productId: product?.id ?? null,
        },
      });
    }
  }

  const counts = {
    users: await prisma.user.count(),
    products: await prisma.product.count(),
    reviews: await prisma.review.count(),
  };
  console.log('Seed fertig:', counts);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
