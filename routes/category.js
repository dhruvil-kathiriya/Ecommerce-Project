const express = require("express");
const routs = express.Router();
const categorycontroller = require("../controller/categorycontroller");
const passport = require("passport");

routs.get("/add_category", passport.checkAuth, categorycontroller.add_category);

routs.get("/view_category", passport.checkAuth, categorycontroller.view_category);

routs.post("/insert_category", categorycontroller.insert_category);

routs.get('/isActive/:id', categorycontroller.isActive);

routs.get('/deActive/:id', categorycontroller.deActive);

routs.get("/deletecategory/:id", categorycontroller.deletecategory);

module.exports = routs;