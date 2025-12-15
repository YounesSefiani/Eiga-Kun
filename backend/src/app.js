const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const path = require('path');

// Autorise toutes les origines (pour Postman et le frontend)
app.use(
  cors({
    origin: "http://localhost:3000", // l'URL de ton frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

module.exports = app;
