const express = require("express");
const routes = express.Router();
const type = require("../models/type");
const typecontroller = require("../controller/typecontroller");
const passport = require("passport");

routes.get("/add_type", passport.checkAuth, typecontroller.add_type);

routes.get("/view_type", passport.checkAuth, typecontroller.view_type);

routes.post("/insert_type", typecontroller.insert_type);

module.exports = routes;