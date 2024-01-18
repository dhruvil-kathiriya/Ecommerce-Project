const express = require("express");
const routs = express.Router();
const usercontroller = require("../controller/usercontroller");

routs.get("/", usercontroller.home);

routs.get("/productlist/:id", usercontroller.productlist);

routs.get("/userlogin", usercontroller.userlogin);

routs.post("/login", usercontroller.login);

routs.post("/createAccount", usercontroller.createAccount);

module.exports = routs;
