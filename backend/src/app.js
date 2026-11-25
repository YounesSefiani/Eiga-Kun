const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const path = require("path");

app.use(cors({ origin: [/^http:\/\/localhost:\d+$/], credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

// MOVIES PICTURES //
app.use('/src/assets/Movies/Posters', express.static(path.join(__dirname, 'assets/Movies/Posters')));
app.use('/src/assets/Movies/Original_Posters', express.static(path.join(__dirname, 'assets/Movies/Original_Posters')));
app.use('/src/assets/Movies/Backgrounds', express.static(path.join(__dirname, 'assets/Movies/Backgrounds')));
app.use('/src/assets/Movies/Logos', express.static(path.join(__dirname, 'assets/Movies/Logos')));
app.use('/src/assets/Movies/Original_Logos', express.static(path.join(__dirname, 'assets/Movies/Original_Logos')));

// SERIES PICTURES //
app.use('/src/assets/Series/Posters', express.static(path.join(__dirname, 'assets/Series/Posters')));
app.use('/src/assets/Series/Original_Posters', express.static(path.join(__dirname, 'assets/Series/Original_Posters')));
app.use('/src/assets/Series/Backgrounds', express.static(path.join(__dirname, 'assets/Series/Backgrounds')));
app.use('/src/assets/Series/Logos', express.static(path.join(__dirname, 'assets/Series/Logos')));
app.use('/src/assets/Series/Original_Logos', express.static(path.join(__dirname, 'assets/Series/Original_Logos')));

// SEASONS PICTURES //
app.use('/src/assets/Series/Seasons/Posters', express.static(path.join(__dirname, 'assets/Series/Seasons/Posters')));

// EPISODES PICTURES //
app.use('/src/assets/Series/Episodes/Images', express.static(path.join(__dirname, 'assets/Series/Episodes/Images')));

module.exports = app;