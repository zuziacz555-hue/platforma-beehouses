const express = require('express');
const app = express();
const PORT = 5005;

app.get('/', (req, res) => {
    console.log('Received GET /');
    res.send('OK');
});

app.listen(PORT, () => {
    console.log(`Simple test server running on port ${PORT}`);
});
