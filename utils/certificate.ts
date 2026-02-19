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

            // Header - "CERTYFIKAT"
            doc.fontSize(60).fillColor('#558b2f'); // Greenish color like in the image
            doc.text('CERTYFIKAT', 0, 100, { align: 'center', width: 842 });

            doc.fontSize(16).fillColor('black');
            doc.text('Niniejszym zaświadcza się, że', 0, 180, { align: 'center', width: 842 });

            // Name - Centered
            doc.fontSize(40).fillColor('black');
            doc.text(`${user.firstName} ${user.lastName}`, 0, 230, {
                align: 'center',
                width: 842
            });

            doc.fontSize(16).text('ukończył(a) kurs', 0, 300, { align: 'center', width: 842 });

            doc.fontSize(24).text('„Wiedza o zapylaczach i ich roli w ekosystemie”', 0, 330, { align: 'center', width: 842 });

            doc.fontSize(12).text(
                'obejmujący zagadnienia z zakresu biologii, znaczenia oraz ochrony zapylaczy, w szczególności\ntakich gatunków jak pszczoła miodna (Apis mellifera), trzmiele oraz inne owady zapylające.',
                0, 380, { align: 'center', width: 842 }
            );

            // Date - Bottom Left
            doc.fontSize(12).fillColor('black');
            doc.text('DATA UKOŃCZENIA', 100, 480);
            doc.fontSize(16);
            doc.text(`${date.toLocaleDateString('pl-PL')}`, 100, 500);

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
}
