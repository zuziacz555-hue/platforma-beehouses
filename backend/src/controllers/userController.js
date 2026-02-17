const prisma = require('../utils/prisma');
const bcrypt = require('bcryptjs');

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
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
        res.json(users);
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get current user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create new user (Admin only)
const createUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role } = req.body;

        console.log('Attempting to create user:', { email, firstName, lastName, role });

        // Validation
        if (!email || !password || !firstName || !lastName) {
            console.log('Validation failed: Missing fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.log('Validation failed: User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName,
                lastName,
                role: role || 'user'
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true
            }
        });

        console.log('User created successfully:', newUser.id);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Create user error details:', error);
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
};

// Change own password
const changePassword = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Both old and new passwords are required' });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid current password' });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash }
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Admin reset password for any user
const resetPasswordAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: parseInt(id) },
            data: { passwordHash }
        });

        res.json({ message: 'Password reset successfully by admin' });
    } catch (error) {
        console.error('Admin reset password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllUsers, getUserProfile, createUser, changePassword, resetPasswordAdmin };
