import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

export async function generateCertificatePDF(user: any, date: Date): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            // Load custom font buffer to avoid ENOENT for standard fonts in serverless
            const fontPath = path.join(process.cwd(), 'fonts', 'Roboto-Regular.woff');
            console.log('Loading font from:', fontPath);
            let fontBuffer: Buffer;

            try {
                fontBuffer = fs.readFileSync(fontPath);
            } catch (err) {
                console.error('Failed to load font file:', err);
                throw err;
            }

            const doc = new PDFDocument({
                layout: 'landscape',
                size: 'A4',
                font: fontBuffer as unknown as string, // Cast to avoid TS error (pdfkit supports buffer at runtime)
            });

            const chunks: any[] = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            // Add certificate content
            doc.rect(50, 50, 742, 495).stroke();

            doc.fontSize(50).text('CERTIFICATE', { align: 'center' });
            doc.moveDown();
            doc.fontSize(20).text('This is to certify that', { align: 'center' });
            doc.moveDown();
            doc.fontSize(40).text(`${user.firstName} ${user.lastName}`, { align: 'center' });
            doc.moveDown();
            doc.fontSize(20).text('has successfully completed the', { align: 'center' });
            doc.moveDown();
            doc.fontSize(30).text('POLISH BEEHOUSES COURSE', { align: 'center' });
            doc.moveDown();
            doc.fontSize(15).text(`Date: ${date.toLocaleDateString()}`, { align: 'center' });

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
}
