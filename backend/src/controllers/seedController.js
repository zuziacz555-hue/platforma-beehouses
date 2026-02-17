const prisma = require('../utils/prisma');
const bcrypt = require('bcryptjs');

const seedDatabase = async (req, res) => {
    try {
        const adminEmail = 'admin@beehouses.org';
        const adminPassword = 'adminpassword123';

        // Check/Create Admin
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (!existingAdmin) {
            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await prisma.user.create({
                data: {
                    email: adminEmail,
                    passwordHash,
                    firstName: 'Bee',
                    lastName: 'Admin',
                    role: 'admin',
                },
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        // Check/Create Chapters
        const chapterCount = await prisma.chapter.count();
        if (chapterCount === 0) {
            await prisma.chapter.createMany({
                data: [
                    {
                        title: 'Wstęp do pszczelarstwa',
                        description: 'Poznaj podstawy życia pszczół i ich rolę w ekosystemie.',
                        content: 'Pszczoły są niezwykle ważne...',
                        orderNumber: 1,
                        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                    },
                    {
                        title: 'Budowa ula',
                        description: 'Jak zbudowany jest dom dla pszczół.',
                        content: 'Ul składa się z wielu elementów...',
                        orderNumber: 2
                    },
                    {
                        title: 'Miód i jego właściwości',
                        description: 'Dlaczego miód jest taki zdrowy?',
                        content: 'Miód powstaje z nektaru...',
                        orderNumber: 3
                    }
                ]
            });
            console.log('Sample chapters created');
        }

        res.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ message: 'Seeding failed', error: error.message });
    }
};

module.exports = { seedDatabase };
