const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        console.log('Registration attempt for:', email);

        // Check if user exists
        console.log('Checking if user exists...');
        const existingUser = await prisma.user.findUnique({ where: { email } });
        console.log('User check done. Exists:', !!existingUser);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        console.log('Hashing password...');
        const passwordHash = await bcrypt.hash(password, 10);
        console.log('Password hashed.');

        // Create user
        console.log('Creating user in DB...');
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName,
                lastName,
                role: 'user' // Default role
            }
        });
        console.log('User created in DB. ID:', user.id);

        res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register, login };
