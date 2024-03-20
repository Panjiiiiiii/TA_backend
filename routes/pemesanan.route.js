const express = require("express");
const app = express();
const pemesanan = require("../controllers/pemesanan.controller");
const {validateUser} = require('../middlewares/user-validation')
const {authorize} = require('../controllers/auth.controller')
const {isCustomer,isAdmin} = require('../middlewares/role-validation')

app.use(express.json());

app.get("/getUser", authorize, isCustomer, validateUser, pemesanan.getAllpemesanan);
app.get("/getAdmin", authorize, isAdmin, pemesanan.getAllpemesanan);

module.exports = app;
