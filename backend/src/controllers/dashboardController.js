const prisma = require('../utils/prisma');

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await prisma.user.count({
            where: { role: 'user' }
        });

        const totalChapters = await prisma.chapter.count();

        const totalCertificates = await prisma.certificate.count();

        // Calculate overall course completion rate
        // Users with at least one completed chapter / total users? 
        // Or users with ALL chapters completed?
        // Let's just return raw counts for now.

        const recentUsers = await prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true
            }
        });

        res.json({
            totalUsers,
            totalChapters,
            totalCertificates,
            recentUsers
        });
    } catch (error) {
        console.error('Get admin stats error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAdminStats };
