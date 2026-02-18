import { PrismaClient } from './generated-client';

const prisma = new PrismaClient();

async function main() {
    // Ensure we have at least one chapter
    const chapter1 = await prisma.chapter.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: 'Wstęp do pszczelarstwa',
            description: 'Poznaj podstawy życia pszczół i ich rolę w ekosystemie.',
            content: 'Pszczoły są niezwykle ważne dla naszego środowiska...',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            orderNumber: 1,
        },
    });

    console.log({ chapter1 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
