import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { authenticate } from '@/utils/auth';
import { generateCertificatePDF } from '@/utils/certificate';

export async function POST(req: NextRequest) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const totalChapters = await prisma.chapter.count();
        const completedChapters = await prisma.userProgress.count({
            where: {
                userId: user.userId,
                completed: true
            }
        });

        if (completedChapters < totalChapters) {
            return NextResponse.json({ message: 'Not all chapters completed' }, { status: 400 });
        }

        const userData = await prisma.user.findUnique({ where: { id: user.userId } });
        const pdfBuffer = await generateCertificatePDF(userData, new Date());

        // In a real Vercel app, we would upload this to S3/Cloudinary.
        // For now, we return it as a response or save the URL if we had storage.
        // Since we don't have storage yet, we'll just indicate it's ready.

        const cert = await prisma.certificate.upsert({
            where: { id: user.userId }, // Assuming one cert per user for now
            update: { issueDate: new Date(), pdfUrl: 'generated' },
            create: { userId: user.userId, pdfUrl: 'generated' }
        });

        // We can return the buffer directly for "download"
        return new NextResponse(new Uint8Array(pdfBuffer), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="certificate.pdf"',
            },
        });
    } catch (error: any) {
        console.error('Generate cert error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const certs = await prisma.certificate.findMany({
            where: { userId: user.userId }
        });
        return NextResponse.json(certs);
    } catch (error: any) {
        console.error('Get certificates error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
