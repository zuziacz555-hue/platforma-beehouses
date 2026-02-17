const prisma = require('../utils/prisma');

// Update progress (add time)
const updateProgress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { chapterId, timeIncrement } = req.body; // timeIncrement in seconds

        // Validate input
        if (!chapterId || !timeIncrement) {
            return res.status(400).json({ message: 'Missing chapterId or timeIncrement' });
        }

        // Upsert progress
        const progress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: parseInt(chapterId)
                }
            },
            update: {
                timeSpent: { increment: parseInt(timeIncrement) },
                updatedAt: new Date()
            },
            create: {
                userId,
                chapterId: parseInt(chapterId),
                timeSpent: parseInt(timeIncrement)
            }
        });

        res.json({
            timeSpent: progress.timeSpent,
            completed: progress.completed,
            canComplete: progress.timeSpent >= 180
        });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Mark chapter as completed
const completeChapter = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { chapterId } = req.body;

        const progress = await prisma.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: parseInt(chapterId)
                }
            }
        });

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }

        if (progress.timeSpent < 180) {
            return res.status(400).json({ message: 'Not enough time spent to complete chapter' });
        }

        const updatedProgress = await prisma.userProgress.update({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: parseInt(chapterId)
                }
            },
            data: {
                completed: true
            }
        });

        res.json(updatedProgress);
    } catch (error) {
        console.error('Complete chapter error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user progress for all chapters
const getProgress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const progress = await prisma.userProgress.findMany({
            where: { userId }
        });
        res.json(progress);
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { updateProgress, completeChapter, getProgress };
