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

// GENRES PICTURES //
app.use('/src/assets/Genres', express.static(path.join(__dirname, '/assets/Genres')));

// THEMES PICTURES //
app.use('/src/assets/Themes', express.static(path.join(__dirname, '/assets/Themes')));

// NATIONALITIES PICTURES //
app.use('/src/assets/Nationalities', express.static(path.join(__dirname, '/assets/Nationalities')));

// STREAMINGS PICTURES //
app.use('/src/assets/Streamings/Brands', express.static(path.join(__dirname, '/assets/Streamings/Brands')));
app.use('/src/assets/Streamings/Icons', express.static(path.join(__dirname, '/assets/Streamings/Icons')));

// UNIVERSES PICTURES //
app.use('/src/assets/Universes', express.static(path.join(__dirname, '/assets/Universes')));

// SUBUNIVERSES PICTURES //
app.use('/src/assets/SubUniverses', express.static(path.join(__dirname, '/assets/SubUniverses')));

// PERSONALITIES PICTURES //
app.use('/src/assets/Personalities/Pictures', express.static(path.join(__dirname, '/assets/Personalities/Pictures')));

// USERS AVATARS //
app.use('/src/assets/Users/Avatars', express.static(path.join(__dirname, '/assets/Users/Avatars')));
module.exports = app;
