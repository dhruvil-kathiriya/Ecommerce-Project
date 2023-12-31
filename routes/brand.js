const express = require("express");
const routes = express.Router();
const brand = require("../models/brand");
const brandcontroller = require("../controller/brandcontroller");
const passport = require("passport");

routes.get("/add_brand", passport.checkAuth, brandcontroller.add_brand);

routes.get("/view_brand", passport.checkAuth, brandcontroller.view_brand);

routes.post("/insert_brand", brandcontroller.insert_brand);

routes.post("/getextracategoryData", brandcontroller.getextracategoryData)

module.exports = routes;