const prisma = require('../utils/prisma');
const { generateCertificatePDF } = require('../services/certificateService');
const path = require('path');
const fs = require('fs');

const generateCertificate = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Check if user has completed all chapters
        const totalChapters = await prisma.chapter.count();
        const completedChapters = await prisma.userProgress.count({
            where: {
                userId,
                completed: true
            }
        });

        if (completedChapters < totalChapters) {
            return res.status(400).json({ message: 'Not all chapters completed' });
        }

        // Check if certificate already exists (but we will regenerate file anyway)
        const existingCert = await prisma.certificate.findFirst({
            where: { userId }
        });

        // Generate PDF
        const fileName = `certificate_${userId}_${Date.now()}.pdf`;
        const outputPath = path.join(__dirname, '../../certificates', fileName);

        // Get user details
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        await generateCertificatePDF(user, new Date(), outputPath);
        const pdfUrl = `/certificates/${fileName}`;

        if (existingCert) {
            // Update existing record
            await prisma.certificate.update({
                where: { id: existingCert.id },
                data: {
                    pdfUrl,
                    issueDate: new Date()
                }
            });
            return res.json({ message: 'Certificate regenerated', pdfUrl });
        } else {
            // Create new
            const cert = await prisma.certificate.create({
                data: {
                    userId,
                    pdfUrl
                }
            });
            return res.status(201).json({ message: 'Certificate generated', pdfUrl });
        }
    } catch (error) {
        console.error('Generate certificate error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const downloadCertificate = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cert = await prisma.certificate.findFirst({
            where: { userId }
        });

        if (!cert) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        const fileName = path.basename(cert.pdfUrl);
        const filePath = path.join(__dirname, '../../certificates', fileName);

        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ message: 'File not found on server' });
        }
    } catch (error) {
        console.error('Download certificate error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { generateCertificate, downloadCertificate };
