const express = require("express");
const routes = express.Router();
const category = require("../models/category");
const categorycontroller = require("../controller/categorycontroller");
const passport = require("passport");

routes.get("/add_category", passport.checkAuth, categorycontroller.add_category);

routes.get("/view_category", passport.checkAuth, categorycontroller.view_category);

routes.post("/insert_category", categorycontroller.insert_category);

// routes.post("/search", categorycontroller.search);

module.exports = routes;