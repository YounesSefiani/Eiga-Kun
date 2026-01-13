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

// SERIES PICTURES //
app.use('/src/assets/Series/Posters', express.static(path.join(__dirname, '/assets/Series/Posters')));
app.use('/src/assets/Series/Backgrounds', express.static(path.join(__dirname, '/assets/Series/Backgrounds')));
app.use('/src/assets/Series/Logos', express.static(path.join(__dirname, '/assets/Series/Logos')));
app.use('/src/assets/Series/Seasons', express.static(path.join(__dirname, '/assets/Series/Seasons')));
app.use('/src/assets/Series/Episodes', express.static(path.join(__dirname, '/assets/Series/Episodes')));


// PERSONALITIES PICTURES //
app.use('/src/assets/Personalities/Pictures', express.static(path.join(__dirname, '/assets/Personalities/Pictures')));
module.exports = app;
