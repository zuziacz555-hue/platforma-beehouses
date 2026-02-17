import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { isAdmin } from '@/utils/auth';

export async function GET() {
    try {
        const chapters = await prisma.chapter.findMany({
            orderBy: { orderNumber: 'asc' },
        });
        return NextResponse.json(chapters);
    } catch (error: any) {
        console.error('Get chapters error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (!await isAdmin(req)) {
        return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    try {
        const { title, description, content, videoUrl, images, orderNumber } = await req.json();
        const chapter = await prisma.chapter.create({
            data: {
                title,
                description,
                content,
                videoUrl,
                images,
                orderNumber: parseInt(orderNumber) || 0,
            }
        });
        return NextResponse.json(chapter, { status: 201 });
    } catch (error: any) {
        console.error('Create chapter error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
