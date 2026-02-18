import fs from 'fs';
import path from 'path';
import { PrismaClient } from '../prisma/generated-client';
import bcrypt from 'bcryptjs';

// Manually load .env
try {
    const envPath = path.resolve(__dirname, '../.env');
    console.log('Looking for .env at:', envPath);
    if (fs.existsSync(envPath)) {
        console.log('Loading environment variables from .env');
        const envConfig = fs.readFileSync(envPath, 'utf-8');
        envConfig.split('\n').forEach((line) => {
            const [key, ...values] = line.split('=');
            if (key && values.length > 0) {
                const value = values.join('=');
                // Remove quotes if present and helper comments
                let cleanValue = value.trim();
                if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) || (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
                    cleanValue = cleanValue.slice(1, -1);
                }
                process.env[key.trim()] = cleanValue;
            }
        });
    } else {
        console.warn('.env file not found at', envPath);
    }
} catch (e) {
    console.error('Error loading .env file', e);
}

console.log('DATABASE_URL is:', process.env.DATABASE_URL); // Temporarily print it to debug (careful with logs!)

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    const email = 'admin@example.com';
    const password = 'admin123'; // Default password for local admin
    const firstName = 'Admin';
    const lastName = 'User';

    console.log(`Checking if user ${email} exists...`);
    const userExists = await prisma.user.findUnique({
        where: { email },
    });

    if (userExists) {
        console.log(`User with email ${email} already exists.`);
        if (userExists.role !== 'admin') {
            console.log(`User exists but role is ${userExists.role}. Updating to admin...`);
            await prisma.user.update({
                where: { email },
                data: { role: 'admin' },
            });
            console.log(`User role updated to admin.`);
        }
        return;
    }

    console.log(`Creating admin user...`);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
            firstName,
            lastName,
            role: 'admin',
        },
    });

    console.log(`✅ Admin user created successfully.`);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
