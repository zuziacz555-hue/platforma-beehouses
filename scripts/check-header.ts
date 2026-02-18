
import fs from 'fs';
import path from 'path';

const fontPath = path.join(process.cwd(), 'fonts', 'Roboto-Regular.woff');
try {
    const buffer = fs.readFileSync(fontPath);
    console.log('File size:', buffer.length);
    console.log('First 50 bytes:', buffer.subarray(0, 50).toString('hex'));
    console.log('First 50 chars:', buffer.subarray(0, 50).toString('utf8'));
} catch (err) {
    console.error('Error reading file:', err);
}
