import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { isAdmin } from '@/utils/auth';
import bcrypt from 'bcryptjs';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    if (!await isAdmin(req)) {
        return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const { id } = await context.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            }
        });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error: any) {
        console.error('Get user error:', error);
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
    try {
        const { email, firstName, lastName, role, password } = await req.json();
        const data: any = {
            email,
            firstName,
            lastName,
            role,
        };

        if (password) {
            data.passwordHash = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data,
        });
        return NextResponse.json(user);
    } catch (error: any) {
        console.error('Update user error:', error);
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
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'User deleted' });
    } catch (error: any) {
        console.error('Delete user error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
