const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificatePDF = (user, issueDate, outputPath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4',
            margin: 0 // Full bleed for background
        });

        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        // --- Colors ---
        const colors = {
            primary: '#d97706', // Amber-600
            secondary: '#0f172a', // Slate-900
            background: '#fffbeb', // Amber-50 (light background)
            border: '#78350f', // Amber-900
        };

        const width = doc.page.width;
        const height = doc.page.height;

        // 1. Background
        doc.rect(0, 0, width, height).fill(colors.background);

        // 2. Ornamental Border
        const margin = 30;
        doc.lineWidth(4)
            .strokeColor(colors.border)
            .rect(margin, margin, width - margin * 2, height - margin * 2)
            .stroke();

        doc.lineWidth(1)
            .strokeColor(colors.primary)
            .rect(margin + 5, margin + 5, width - (margin * 2 + 10), height - (margin * 2 + 10))
            .stroke();

        // 3. Logo
        const logoPath = path.join(__dirname, '../assets/logo.png');
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, width / 2 - 50, 60, { width: 100 });
        }

        // 4. Header
        doc.moveDown(5); // Space for logo

        doc.font('Helvetica-Bold')
            .fontSize(40)
            .fillColor(colors.border)
            .text('BeeHouses Foundation', 0, 180, { align: 'center' });

        doc.moveDown(0.5);
        doc.font('Helvetica-Bold')
            .fontSize(30)
            .fillColor(colors.secondary)
            .text('CERTYFIKAT UKOŃCZENIA', { align: 'center', characterSpacing: 2 });

        // 5. Body
        doc.moveDown(1.5);
        doc.font('Helvetica')
            .fontSize(16)
            .fillColor('#475569') // Slate-600
            .text('Niniejszym zaświadcza się, że', { align: 'center' });

        doc.moveDown(1);
        doc.font('Helvetica-Bold')
            .fontSize(36)
            .fillColor(colors.primary)
            .text(`${user.firstName} ${user.lastName}`, { align: 'center' });

        // Underline name
        const nameWidth = doc.widthOfString(`${user.firstName} ${user.lastName}`);
        doc.lineWidth(2)
            .strokeColor(colors.primary)
            .moveTo(width / 2 - nameWidth / 2, doc.y)
            .lineTo(width / 2 + nameWidth / 2, doc.y)
            .stroke();

        doc.moveDown(1);
        doc.font('Helvetica')
            .fontSize(16)
            .fillColor('#475569')
            .text('pomyślnie ukończył(a) kurs wiedzy pszczelarskiej na Platformie Edukacyjnej.', { align: 'center' });

        // 6. Footer (Date and Signature)
        const bottomY = height - 120;

        // Date (Left)
        const formattedDate = new Date(issueDate).toLocaleDateString('pl-PL');
        doc.fontSize(12)
            .fillColor(colors.secondary)
            .text(`Data: ${formattedDate}`, margin + 50, bottomY);

        doc.lineWidth(1)
            .strokeColor('#94a3b8') // Slate-400
            .moveTo(margin + 50, bottomY - 5)
            .lineTo(margin + 200, bottomY - 5)
            .stroke();

        // Signature (Right)
        doc.text('Zarząd BeeHouses', width - margin - 200, bottomY, { width: 150, align: 'center' });

        doc.lineWidth(1)
            .strokeColor('#94a3b8')
            .moveTo(width - margin - 200, bottomY - 5)
            .lineTo(width - margin - 50, bottomY - 5)
            .stroke();

        // Footer small text
        doc.fontSize(10)
            .fillColor('#94a3b8')
            .text(`ID Certyfikatu: BH-${user.id}-${Date.now().toString().slice(-4)}`, 0, height - margin - 20, { align: 'center' });

        doc.end();

        stream.on('finish', () => resolve(outputPath));
        stream.on('error', reject);
    });
};

module.exports = { generateCertificatePDF };
