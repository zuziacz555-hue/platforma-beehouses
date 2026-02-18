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


