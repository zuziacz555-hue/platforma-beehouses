console.log('Testing requires...');
try {
    console.log('Requiring express...');
    require('express');
    console.log('Requiring cors...');
    require('cors');
    console.log('Requiring cookie-parser...');
    require('cookie-parser');
    console.log('Requiring dotenv...');
    require('dotenv').config();
    console.log('Requiring routes...');
    require('./src/routes/authRoutes');
    require('./src/routes/chapterRoutes');
    require('./src/routes/userRoutes');
    require('./src/routes/progressRoutes');
    require('./src/routes/certificateRoutes');
    require('./src/routes/dashboardRoutes');
    console.log('Requiring controllers...');
    require('./src/controllers/seedController');
    console.log('All requires successful!');
} catch (e) {
    console.error('Require failed:', e);
    process.exit(1);
}
