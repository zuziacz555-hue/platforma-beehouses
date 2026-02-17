import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
    userId: number;
    role: string;
}

export async function authenticate(req: NextRequest): Promise<AuthUser | null> {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
        return decoded;
    } catch (error) {
        return null;
    }
}

export async function isAdmin(req: NextRequest): Promise<boolean> {
    const user = await authenticate(req);
    return user?.role === 'admin';
}
