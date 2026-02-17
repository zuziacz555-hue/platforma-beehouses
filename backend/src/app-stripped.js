require('dotenv').config();
const express = require('express');

const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true
}));
app.use(express.json());



app.use((req, res, next) => {
    console.log(`[EARLY LOGGER] ${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('Stripped OK');
});

module.exports = app;
