const express = require("express");
const routes = express.Router();
const product = require("../models/product");
const productcontroller = require("../controller/productcontroller");

routes.get("/add_product", productcontroller.add_product);

routes.get("/view_product", productcontroller.view_product);

routes.post("/insert_product", productcontroller.insert_product);
module.exports = routes;