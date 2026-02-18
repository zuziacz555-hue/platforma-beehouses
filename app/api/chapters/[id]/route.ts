import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { isAdmin } from '@/utils/auth';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const chapterId = parseInt(id);

    if (isNaN(chapterId)) {
        return NextResponse.json({ message: 'Invalid chapter ID' }, { status: 400 });
    }

    try {
        const chapter = await prisma.chapter.findUnique({
            where: { id: chapterId },
        });
        if (!chapter) {
            return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });
        }
        return NextResponse.json(chapter);
    } catch (error: any) {
        console.error('Get chapter error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    if (!await isAdmin(req)) {
        return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const { id } = await context.params;
    const chapterId = parseInt(id);

    if (isNaN(chapterId)) {
        return NextResponse.json({ message: 'Invalid chapter ID' }, { status: 400 });
    }

    try {
        const { title, description, content, videoUrl, images, orderNumber } = await req.json();
        const chapter = await prisma.chapter.update({
            where: { id: chapterId },
            data: {
                title,
                description,
                content,
                videoUrl,
                images,
                orderNumber: parseInt(orderNumber) || 0,
            }
        });
        return NextResponse.json(chapter);
    } catch (error: any) {
        console.error('Update chapter error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    if (!await isAdmin(req)) {
        return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const { id } = await context.params;
    const chapterId = parseInt(id);

    if (isNaN(chapterId)) {
        return NextResponse.json({ message: 'Invalid chapter ID' }, { status: 400 });
    }

    try {
        await prisma.chapter.delete({
            where: { id: chapterId },
        });
        return NextResponse.json({ message: 'Chapter deleted' });
    } catch (error: any) {
        console.error('Delete chapter error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
