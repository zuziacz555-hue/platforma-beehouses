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

            // Add background image
            const bgPath = path.join(process.cwd(), 'public', 'certificate-bg.png');
            try {
                if (fs.existsSync(bgPath)) {
                    doc.image(bgPath, 0, 0, { width: 842, height: 595 }); // A4 Landscape dimensions
                } else {
                    console.warn('Background image not found, drawing fallback border');
                    doc.rect(50, 50, 742, 495).stroke();
                }
            } catch (bgErr) {
                console.error('Error loading background:', bgErr);
                doc.rect(50, 50, 742, 495).stroke();
            }

            // Text Positioning based on the provided design
            // Name should be centered, roughly in the middle-upper part
            // Date should be bottom-left

            // Configure font size for the name
            doc.fontSize(40).fillColor('black');

            // Name - Centered
            // Adjust '300' to vertically align with the "gap" in the certificate design
            doc.text(`${user.firstName} ${user.lastName}`, 0, 290, {
                align: 'center',
                width: 842 // Full width for centering
            });

            // Date - Bottom Left
            // Adjust coordinates to match the "data ukończenia" line
            doc.fontSize(15);
            doc.text(`${date.toLocaleDateString()}`, 180, 445, {
                align: 'left'
            });

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
}
