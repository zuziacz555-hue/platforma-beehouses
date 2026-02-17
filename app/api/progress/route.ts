import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { authenticate } from '@/utils/auth';

export async function GET(req: NextRequest) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const progress = await prisma.userProgress.findMany({
            where: { userId: user.userId }
        });
        return NextResponse.json(progress);
    } catch (error: any) {
        console.error('Get progress error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const { chapterId, timeIncrement, completed } = await req.json();

        const progress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: user.userId,
                    chapterId: parseInt(chapterId)
                }
            },
            update: {
                timeSpent: timeIncrement ? { increment: parseInt(timeIncrement) } : undefined,
                completed: completed ?? undefined,
                updatedAt: new Date()
            },
            create: {
                userId: user.userId,
                chapterId: parseInt(chapterId),
                timeSpent: parseInt(timeIncrement) || 0,
                completed: completed || false
            }
        });

        return NextResponse.json(progress);
    } catch (error: any) {
        console.error('Update progress error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
