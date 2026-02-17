const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Minimal server running on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('GLOBAL ERROR:', err);
});
