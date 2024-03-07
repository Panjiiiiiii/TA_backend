const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const {validateUser} = require('../middlewares/user-validation')
const {authorize} = require('../controllers/auth.controller')
const {isCustomer,isAdmin} = require('../middlewares/role-validation')
const tipeControllers = require('../controllers/tipe_kamar.controller')

app.use(express.json())

app.get("/", tipeControllers.getAllType)
app.get("/count", tipeControllers.CountType)
app.post("/find/:keyword", tipeControllers.findType)
app.post("/insert",tipeControllers.addType)
app.put("/update/:id",tipeControllers.updateType)
app.delete("/delete/:id", tipeControllers.deleteType)

module.exports = app;