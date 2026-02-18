import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { authenticate } from '@/utils/auth';

export async function POST(req: NextRequest) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const { chapterId, timeIncrement } = await req.json();

        const id = parseInt(chapterId);
        const inc = parseInt(timeIncrement);

        if (isNaN(id) || isNaN(inc)) {
            return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
        }

        const progress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: user.userId,
                    chapterId: id
                }
            },
            update: {
                timeSpent: { increment: inc },
                updatedAt: new Date()
            },
            create: {
                userId: user.userId,
                chapterId: id,
                timeSpent: inc,
                completed: false
            }
        });

        return NextResponse.json(progress);
    } catch (error: any) {
        console.error('Update progress error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
