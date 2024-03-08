const express = require("express");
const app = express();
const {authorize} = require('../controllers/auth.controller')
const {isAdmin} = require('../middlewares/role-validation')
const tipeControllers = require('../controllers/tipe_kamar.controller')

app.use(express.json())

app.get("/", authorize,isAdmin, tipeControllers.getAllType)
app.get("/count", authorize,isAdmin, tipeControllers.CountType)
app.post("/find/:keyword", authorize,isAdmin, tipeControllers.findType)
app.post("/insert", authorize, isAdmin, tipeControllers.addType)
app.put("/update/:id", authorize, isAdmin, tipeControllers.updateType)
app.delete("/delete/:id", authorize, isAdmin, tipeControllers.deleteType)

module.exports = app;