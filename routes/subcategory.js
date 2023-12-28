const express = require("express");
const routes = express.Router();
const category = require("../models/category");
const subcategory = require("../models/subcategory");
const subcategorycontroller = require("../controller/subcategorycontroller");
const passport = require("passport");

routes.get("/add_subcategory", passport.checkAuth, subcategorycontroller.add_subcategory);

routes.get("/view_subcategory", passport.checkAuth, subcategorycontroller.view_subcategory);

routes.post("/insert_subcategory", subcategorycontroller.insert_subcategory);

module.exports = routes;