const files = [
    './src/routes/authRoutes',
    './src/routes/chapterRoutes',
    './src/routes/userRoutes',
    './src/routes/progressRoutes',
    './src/routes/certificateRoutes',
    './src/routes/dashboardRoutes'
];

files.forEach(file => {
    try {
        console.log(`Testing ${file}...`);
        const router = require(file);
        console.log(`Success: ${file} exported ${typeof router}`);
    } catch (e) {
        console.error(`Fail: ${file}`, e.message);
    }
});
console.log('Done.');
