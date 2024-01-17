const express = require("express");
const routs = express.Router();
const brandcontroller = require("../controller/brandcontroller");
const passport = require("passport");

routs.get("/add_brand", passport.checkAuth, brandcontroller.add_brand);

routs.get("/view_brand", passport.checkAuth, brandcontroller.view_brand);

routs.post("/insert_brand", brandcontroller.insert_brand);

routs.get("/isActive/:id", brandcontroller.isActive);

routs.get("/deActive/:id", brandcontroller.deActive);

routs.get("/deletebrand/:id", brandcontroller.deletebrand);

routs.post("/getextracategoryData", brandcontroller.getextracategoryData);

routs.get("/updatebrand/:id", brandcontroller.updatebrand);

routs.post("/editbrand/:id", brandcontroller.editbrand);

module.exports = routs;
