import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

export async function generateCertificatePDF(user: any, date: Date): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            // Load custom font buffer to avoid ENOENT for standard fonts in serverless
            // Using public/fonts/Arial.ttf for Vercel bundling compatibility
            const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf');
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

            // Add background image - ensure path is consistently resolved
            const bgPath = path.join(process.cwd(), 'public', 'certificate-bg.png');
            try {
                if (fs.existsSync(bgPath)) {
                    const stats = fs.statSync(bgPath);
                    // If file is too small (e.g. < 20KB), it's probably my placeholder or a corrupt save
                    if (stats.size > 20000) {
                        doc.image(bgPath, 0, 0, { width: 842, height: 595 }); // A4 Landscape dimensions
                    } else {
                        console.warn('Background image too small, drawing fallback border');
                        doc.rect(50, 50, 742, 495).stroke();
                    }
                } else {
                    console.warn('Background image not found, drawing fallback border');
                    doc.rect(50, 50, 742, 495).stroke();
                }
            } catch (bgErr) {
                console.error('Error loading background:', bgErr);
                doc.rect(50, 50, 742, 495).stroke();
            }

            // Text Positioning based on the provided design
            // The image already contains most of the text.
            // We only need to insert the Name and the Date.

            // Name - Centered in the middle placeholder (moved significantly higher to y=230)
            doc.fontSize(40).fillColor('#2e4d2a');
            doc.text(`${user.firstName} ${user.lastName}`, 0, 230, {
                align: 'center',
                width: 842
            });

            // Date - Above the horizontal line (moved higher to y=390 and further left to x=160)
            doc.fontSize(16).fillColor('black');
            doc.text(`${date.toLocaleDateString('pl-PL')}`, 160, 390, {
                width: 150,
                align: 'center'
            });

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
}
