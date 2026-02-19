const fs = require('fs');
const path = require('path');

try {
    const src = 'C:\\Users\\Zuzanka\\.gemini\\antigravity\\brain\\91b7a85d-786c-496f-b567-50718b0c8878\\media__1771526356632.jpg';
    const publicDir = 'c:\\Users\\Zuzanka\\Desktop\\unionki\\zapylacze projekt ciasteczka\\public';
    const appDir = 'c:\\Users\\Zuzanka\\Desktop\\unionki\\zapylacze projekt ciasteczka\\app';

    const destLogo = path.join(publicDir, 'beehouses-logo.jpg');
    const destIcon = path.join(appDir, 'icon.jpg');

    // Copy user logo to new locations
    fs.copyFileSync(src, destLogo);
    console.log('Copied logo to', destLogo);

    fs.copyFileSync(src, destIcon);
    console.log('Copied icon to', destIcon);

    // Clean up old files
    const filesToDelete = [
        path.join(publicDir, 'logo.png'),
        path.join(publicDir, 'logo.svg'),
        path.join(appDir, 'icon.png'),
        path.join(appDir, 'icon.svg'),
        path.join(appDir, 'favicon.ico')
    ];

    filesToDelete.forEach(f => {
        if (fs.existsSync(f)) {
            fs.unlinkSync(f);
            console.log('Deleted', f);
        }
    });
} catch (error) {
    console.error('Error:', error);
    process.exit(1);
}
