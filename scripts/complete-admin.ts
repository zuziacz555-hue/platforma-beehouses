
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'admin@example.com' }
        });

        if (!user) {
            console.log('Admin user not found');
            return;
        }

        const chapters = await prisma.chapter.findMany();

        for (const chapter of chapters) {
            await prisma.userProgress.upsert({
                where: {
                    userId_chapterId: {
                        userId: user.id,
                        chapterId: chapter.id
                    }
                },
                update: {
                    completed: true,
                    timeSpent: 180 // Ensure time requirement is met
                },
                create: {
                    userId: user.id,
                    chapterId: chapter.id,
                    completed: true,
                    timeSpent: 180
                }
            });
            console.log(`Marked chapter ${chapter.id} as completed for admin`);
        }

    } catch (error) {
        console.error('Error completing chapters:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
