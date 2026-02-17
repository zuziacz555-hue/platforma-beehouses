const prisma = require('../utils/prisma');

// Get all chapters (for list view)
const getAllChapters = async (req, res) => {
    try {
        const chapters = await prisma.chapter.findMany({
            orderBy: { orderNumber: 'asc' },
            select: {
                id: true,
                title: true,
                description: true,
                orderNumber: true,
                // Exclude content for list view to reduce payload
            }
        });

        // If user is logged in, we might want to fetch their progress too
        // But for now, just return chapters. Progress can be a separate call or merged here if userId is passed.

        res.json(chapters);
    } catch (error) {
        console.error('Get all chapters error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get single chapter details
const getChapterById = async (req, res) => {
    try {
        const { id } = req.params;
        const chapter = await prisma.chapter.findUnique({
            where: { id: parseInt(id) }
        });

        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        res.json(chapter);
    } catch (error) {
        console.error('Get chapter error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create chapter (Admin only)
const createChapter = async (req, res) => {
    try {
        const { title, description, content, videoUrl, orderNumber } = req.body;

        const chapter = await prisma.chapter.create({
            data: {
                title,
                description,
                content,
                videoUrl,
                orderNumber: parseInt(orderNumber)
            }
        });

        res.status(201).json(chapter);
    } catch (error) {
        console.error('Create chapter error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update chapter (Admin only)
const updateChapter = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content, videoUrl, orderNumber } = req.body;

        const chapter = await prisma.chapter.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                content,
                videoUrl,
                orderNumber: parseInt(orderNumber)
            }
        });

        res.json(chapter);
    } catch (error) {
        console.error('Update chapter error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete chapter (Admin only)
const deleteChapter = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.chapter.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Delete chapter error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllChapters,
    getChapterById,
    createChapter,
    updateChapter,
    deleteChapter
};
