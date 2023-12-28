const express = require("express");
const routes = express.Router();
const type = require("../models/type");
const typecontroller = require("../controller/typecontroller");

routes.get("/add_type", typecontroller.add_type);

routes.get("/view_type", typecontroller.view_type);

routes.post("/insert_type", typecontroller.insert_type);

module.exports = routes;