const express = require("express");
const app = express();
const pemesanan = require("../controllers/pemesanan.controller");

app.use(express.json());

app.get("/", pemesanan.getAllkamar);

module.exports = app;
