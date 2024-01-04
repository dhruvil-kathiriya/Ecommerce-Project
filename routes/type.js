const express = require("express");
const routs = express.Router();
const typecontroller = require("../controller/typecontroller");
const passport = require("passport");

routs.get("/add_type", passport.checkAuth, typecontroller.add_type);

routs.get("/view_type", passport.checkAuth, typecontroller.view_type);

routs.post("/insert_type", typecontroller.insert_type);

routs.get('/isActive/:id', typecontroller.isActive);

routs.get('/deActive/:id', typecontroller.deActive);

routs.get('/deletetype/:id', typecontroller.deletetype);

routs.post('/getextbrandData', typecontroller.getBrand)

module.exports = routs;