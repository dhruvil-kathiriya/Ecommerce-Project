const express = require("express");
const routes = express.Router();
const category = require("../models/category");
const categorycontroller = require("../controller/categorycontroller");

routes.get("/add_category", categorycontroller.add_category);

routes.get("/view_category", categorycontroller.view_category);

routes.post("/insert_category", categorycontroller.insert_category);

module.exports = routes;