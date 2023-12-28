const express = require("express");
const routes = express.Router();
const brand = require("../models/brand");
const brandcontroller = require("../controller/brandcontroller");

routes.get("/add_brand", brandcontroller.add_brand);

routes.get("/view_brand", brandcontroller.view_brand);

routes.post("/insert_brand", brandcontroller.insert_brand);

module.exports = routes;