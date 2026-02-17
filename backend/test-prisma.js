const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

console.log('DB URL:', process.env.DATABASE_URL);

try {
    const prisma = new PrismaClient({});
    console.log('Instantiated PrismaClient');
    prisma.$connect()
        .then(() => {
            console.log('Connected to DB');
            return prisma.user.count().then(c => console.log('User count:', c));
        })
        .then(() => prisma.$disconnect())
        .catch(e => {
            console.error('Connection failed:', e);
        });
} catch (e) {
    console.error('Instantiation failed:', e);
}
