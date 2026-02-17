require('dotenv').config();
// const app = require('./app-stripped');
const authRoutes = require('./routes/authRoutes');
const express = require('express');
const app = express();




app.get('/', (req, res) => res.send('Dummy OK'));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.post('/api/auth/register', (req, res) => res.send('Dummy Register OK'));


const prisma = require('./utils/prisma');

app.get('/prisma-test', async (req, res) => {
    try {
        console.log('Prisma test starting...');
        const count = await prisma.user.count();
        console.log('Prisma test success. Count:', count);
        res.json({ count });
    } catch (e) {
        console.error('Prisma test failed:', e);
        res.status(500).json({ error: e.message });
    }
});



process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = 5002;

try {
    const server = app.listen(PORT, () => {
        console.log(`Debug server running on port ${PORT}`);
    });

    server.on('connection', (socket) => {
        console.log(`NEW CONNECTION from ${socket.remoteAddress}:${socket.remotePort}`);
    });

    server.on('error', (err) => {
        console.error('SERVER ERROR EVENT:', err);
    });
} catch (error) {
    console.error('SERVER START ERROR:', error);
}

// Keep process alive if needed
setInterval(() => { }, 1000);
