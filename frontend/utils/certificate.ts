import PDFDocument from 'pdfkit';

export async function generateCertificatePDF(user: any, date: Date): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                layout: 'landscape',
                size: 'A4',
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
