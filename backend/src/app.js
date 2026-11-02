const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");

app.use(cors({ origin: [/^http:\/\/localhost:\d+$/], credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

module.exports = app;