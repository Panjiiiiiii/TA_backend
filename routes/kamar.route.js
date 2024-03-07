const express = require("express");
const app = express();
const {authorize} = require('../controllers/auth.controller')
const {isAdmin} = require('../middlewares/role-validation')
const kamarControllers = require('../controllers/kamar.controller')

app.use(express.json())


app.get("/", kamarControllers.getAllkamar)
app.post("/add", kamarControllers.addKamar)
app.put("/update", kamarControllers.updateKamar)
app.delete("/delete/:id", kamarControllers.deleteKamar)

module.exports = app;