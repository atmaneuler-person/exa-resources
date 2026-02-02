const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
});

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@exaeuler.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'exa123456';
  
  console.log(`Seeding admin user: ${adminEmail}`);

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Administrator'
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN'
    },
  });

  console.log('Admin user created/updated:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
