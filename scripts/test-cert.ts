
import { generateCertificatePDF } from '../utils/certificate';
import fs from 'fs';

async function main() {
    const user = {
        firstName: 'Test',
        lastName: 'User'
    };
    const date = new Date();

    try {
        console.log('Generating certificate...');
        const buffer = await generateCertificatePDF(user, date);
        console.log('Certificate generated, size:', buffer.length);
        fs.writeFileSync('test-cert.pdf', buffer);
        console.log('Saved to test-cert.pdf');
    } catch (error) {
        console.error('Error generating certificate:', error);
    }
}

main();
