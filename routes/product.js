const express = require("express");
const routes = express.Router();
const product = require("../models/product");
const productcontroller = require("../controller/productcontroller");
const passport = require("passport");

routes.get("/add_product", passport.checkAuth, productcontroller.add_product);

routes.get("/view_product", passport.checkAuth, productcontroller.view_product);

routes.post("/insert_product", productcontroller.insert_product);

routes.post("/getBrandType", productcontroller.getBrandType)

module.exports = routes;