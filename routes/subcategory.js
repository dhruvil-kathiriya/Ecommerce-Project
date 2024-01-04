const express = require("express");
const routs = express.Router();
const category = require("../models/category");
const subcategory = require("../models/subcategory");
const subcategorycontroller = require("../controller/subcategorycontroller");
const passport = require("passport");

routs.get("/add_subcategory", passport.checkAuth, subcategorycontroller.add_subcategory);

routs.get("/view_subcategory", passport.checkAuth, subcategorycontroller.view_subcategory);

routs.post("/insert_subcategory", subcategorycontroller.insert_subcategory);

routs.get('/isActive/:id', subcategorycontroller.isActive);

routs.get('/deActive/:id', subcategorycontroller.deActive);

routs.get('/deletesubcategory/:id', subcategorycontroller.deletesubcategory);

module.exports = routs;