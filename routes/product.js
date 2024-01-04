const express = require("express");
const routs = express.Router();
const product = require("../models/product");
const productcontroller = require("../controller/productcontroller");
const passport = require("passport");

routs.get("/add_product", passport.checkAuth, productcontroller.add_product);

routs.get("/view_product", passport.checkAuth, productcontroller.view_product);

routs.post("/insert_product", product.uploadProductImage, productcontroller.insert_product);

routs.get('/isActive/:id', productcontroller.isActive);

routs.get('/deActive/:id', productcontroller.deActive);

routs.get('/deleteproduct/:id', productcontroller.deleteproduct);

routs.post("/getBrandType", productcontroller.getBrandType)

module.exports = routs;