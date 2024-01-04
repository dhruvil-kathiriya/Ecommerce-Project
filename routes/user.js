const express = require("express");
const routs = express.Router();
const usercontroller = require("../controller/usercontroller");

routs.get("/home", usercontroller.home);

module.exports = routs;