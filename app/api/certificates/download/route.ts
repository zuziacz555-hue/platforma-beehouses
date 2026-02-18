import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { authenticate } from '@/utils/auth';
import { generateCertificatePDF } from '@/utils/certificate';

export async function GET(req: NextRequest) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const cert = await prisma.certificate.findUnique({
            where: { userId: user.userId }
        });

        if (!cert) {
            return NextResponse.json({ message: 'Certificate not found' }, { status: 404 });
        }

        // Ideally, we'd fetch the PDF from S3 using cert.pdfUrl.
        // Since we generate it on the fly currently and don't store files:
        // We will regenerate it for download.
        // In a real app, this is inefficient, but for this setup it works.

        const userData = await prisma.user.findUnique({ where: { id: user.userId } });
        const pdfBuffer = await generateCertificatePDF(userData, cert.issueDate);

        return new NextResponse(new Uint8Array(pdfBuffer), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Certyfikat_BeeHouses.pdf"',
            },
        });

    } catch (error: any) {
        console.error('Download cert error:', error);
        return NextResponse.json({ message: `Internal server error: ${error.message}` }, { status: 500 });
    }
}
