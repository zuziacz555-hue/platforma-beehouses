import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../utils/prisma';
import { isAdmin } from '../../../../utils/auth';

export async function GET(req: NextRequest) {
    if (!await isAdmin(req)) {
        return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    try {
        const userCount = await prisma.user.count();
        const chapterCount = await prisma.chapter.count();
        const certificateCount = await prisma.certificate.count();

        // Count total completed chapters (simplified)
        const progressCount = await prisma.userProgress.count({
            where: { completed: true }
        });

        return NextResponse.json({
            stats: [
                { title: 'Users', value: userCount, icon: 'Users' },
                { title: 'Chapters', value: chapterCount, icon: 'BookOpen' },
                { title: 'Certificates', value: certificateCount, icon: 'Award' },
                { title: 'Completions', value: progressCount, icon: 'CheckCircle' },
            ],
            recentUsers: await prisma.user.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: { id: true, email: true, firstName: true, createdAt: true }
            })
        });
    } catch (error: any) {
        console.error('Stats error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
