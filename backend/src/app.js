const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const path = require('path');

// Autorise toutes les origines (pour Postman et le frontend)
app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/], // autorise tous les ports localhost
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// MOVIES PICTURES // 
app.use('/src/assets/Movies/Posters', express.static(path.join(__dirname, 'assets/Movies/Posters')));
app.use('/src/assets/Movies/Backgrounds', express.static(path.join(__dirname, '/assets/Movies/Backgrounds')));
app.use('/src/assets/Movies/Logos', express.static(path.join(__dirname, '/assets/Movies/Logos')));

module.exports = app;
