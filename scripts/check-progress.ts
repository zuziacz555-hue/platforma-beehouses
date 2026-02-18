
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({
            include: {
                progress: true,
                certificates: true
            }
        });

        const chapters = await prisma.chapter.findMany();
        const totalChapters = chapters.length;

        console.log(`Total chapters: ${totalChapters}`);

        for (const user of users) {
            const completedCount = user.progress.filter(p => p.completed).length;
            console.log(`User: ${user.email} (${user.id})`);
            console.log(`  Progress: ${completedCount}/${totalChapters} completed`);
            console.log(`  Certificates: ${user.certificates.length}`);

            if (completedCount < totalChapters) {
                console.log('  -> Cannot generate certificate (not all chapters completed)');
            } else {
                console.log('  -> Eligible for certificate');
            }
        }
    } catch (error) {
        console.error('Error checking progress:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
