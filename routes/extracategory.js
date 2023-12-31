const express = require("express");
const routes = express.Router();
const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const extracategorycontroller = require("../controller/extracategorycontroller");
const passport = require("passport");

routes.get("/add_extracategory", passport.checkAuth, extracategorycontroller.add_extracategory);

routes.get("/view_extracategory", passport.checkAuth, extracategorycontroller.view_extracategory);

routes.post("/insert_extracategory", extracategorycontroller.insert_extracategory);

routes.post("/getsubcategoryData", extracategorycontroller.getsubcategoryData)

module.exports = routes;