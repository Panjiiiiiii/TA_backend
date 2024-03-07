const express = require("express");
const app = express();
const {validateUser} = require('../middlewares/user-validation')
const {authorize} = require('../controllers/auth.controller')
const {isCustomer,isAdmin} = require('../middlewares/role-validation')
const userController = require("../controllers/user.controller");

app.use(express.json())

app.get("/", userController.getAllUser);
app.get("/count", userController.countCustomer)
app.post("/add", userController.addUser);
app.post("/register", userController.register);
app.post("/find/:keyword", userController.getUser);
app.put("/update/:id", userController.updateUser);
app.put("/reset/:id", userController.resetPassword)
app.delete("/delete/:id", userController.deleteUser);

module.exports = app;
