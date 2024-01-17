const express = require("express");
const routs = express.Router();
const usercontroller = require("../controller/usercontroller");

routs.get("/", usercontroller.home);

module.exports = routs;
