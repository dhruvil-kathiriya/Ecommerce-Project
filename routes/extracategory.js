const express = require("express");
const routes = express.Router();
const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const extracategorycontroller = require("../controller/extracategorycontroller");

routes.get("/add_extracategory", extracategorycontroller.add_extracategory);

routes.get("/view_extracategory", extracategorycontroller.view_extracategory);

routes.post("/insert_extracategory", extracategorycontroller.insert_extracategory);



module.exports = routes;