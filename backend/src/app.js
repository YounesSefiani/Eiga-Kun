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

module.exports = app;