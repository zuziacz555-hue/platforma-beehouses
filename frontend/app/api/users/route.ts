import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { isAdmin } from '@/utils/auth';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
    if (!await isAdmin(req)) {
        return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            }
        });
        return NextResponse.json(users);
    } catch (error: any) {
        console.error('Get users error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (!await isAdmin(req)) {
        return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    try {
        const { email, password, firstName, lastName, role } = await req.json();

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Use a default password if none provided, or require it
        const passwordHash = await bcrypt.hash(password || 'Temporary123!', 10);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName,
                lastName,
                role: role || 'user'
            }
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        console.error('Create user error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
