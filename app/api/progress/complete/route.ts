import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { authenticate } from '@/utils/auth';

export async function POST(req: NextRequest) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const { chapterId } = await req.json();

        const id = parseInt(chapterId);

        if (isNaN(id)) {
            return NextResponse.json({ message: 'Invalid chapter ID' }, { status: 400 });
        }

        // Fetch current progress
        const currentProgress = await prisma.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId: user.userId,
                    chapterId: id
                }
            }
        });

        if (!currentProgress) {
            return NextResponse.json({ message: 'No progress found' }, { status: 404 });
        }

        if (currentProgress.timeSpent < 180) { // 3 minutes
            return NextResponse.json({ message: 'Not enough time spent' }, { status: 403 });
        }

        const progress = await prisma.userProgress.update({
            where: {
                userId_chapterId: {
                    userId: user.userId,
                    chapterId: id
                }
            },
            data: {
                completed: true,
                updatedAt: new Date()
            }
        });

        return NextResponse.json(progress);
    } catch (error: any) {
        console.error('Complete progress error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
