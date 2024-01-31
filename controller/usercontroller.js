const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const product = require("../models/product");
const User = require("../models/user");
const cart = require("../models/cart");
const session = require("express-session");
const { stat } = require("fs/promises");

module.exports.home = async (req, res) => {
  let catData = await category.find({ isActive: true });
  let subcatData = await subcategory.find({ isActive: true });
  let extracatData = await extracategory.find({ isActive: true });
  let productData = await product.find({ isActive: true });
  return res.render("User_pages/dashboard", {
    catData: catData,
    subcatData: subcatData,
    extracatData: extracatData,
    productData: productData,
  });
};

module.exports.productlist = async (req, res) => {
  let catData = await category.find({ isActive: true });
  let subcatData = await subcategory.find({ isActive: true });
  let extracatData = await extracategory.find({ isActive: true });
  let productData = await product
    .findById(req.params.id)
    .populate([
      "categoryId",
      "subcategoryId",
      "extracategoryId",
      "brandId",
      "typeId",
    ]);
  // console.log(productData);
  return res.render("User_pages/productlist", {
    catData: catData,
    subcatData: subcatData,
    extracatData: extracatData,
    productData: productData,
  });
};

module.exports.userlogin = async (req, res) => {
  let catData = await category.find({ isActive: true });
  let subcatData = await subcategory.find({ isActive: true });
  let extracatData = await extracategory.find({ isActive: true });
  let productData = await product
    .findById(req.params.id)
    .populate([
      "categoryId",
      "subcategoryId",
      "extracategoryId",
      "brandId",
      "typeId",
    ]);
  return res.render("User_pages/UserLogin", {
    catData: catData,
    subcatData: subcatData,
    extracatData: extracatData,
    productData: productData,
  });
};

module.exports.login = async (req, res) => {
  try {
    console.log("User Logged In Successfully");
    return res.redirect("/");
  } catch (error) {
    if (error) console.log(error);
    return res.redirect("back");
  }
};

module.exports.createAccount = async (req, res) => {
  try {
    if (req.body.password == req.body.cpassword) {
      req.body.role = "user";
      req.body.isActive = true;
      req.body.created_date = new Date().toLocaleString();
      req.body.updated_date = new Date().toLocaleString();
      let userData = await User.create(req.body);
      if (userData) {
        console.log("User Registered Successfully");
        return res.redirect("/");
      } else {
        console.log("User is Not Registered");
        return res.redirect("back");
      }
    } else {
      console.log("Password Does Not Match");
      return res.redirect("back");
    }
  } catch (error) {
    if (error) {
      console.log(error, "Something went Wrong");
    }
  }
};

module.exports.addProducttocart = async (req, res) => {
  try {
    // console.log(req.body);
    var incart = await cart.findOne({
      productId: req.params.id,
      userId: req.body.userId,
      status: "pending",
    });
    if (incart) {
      console.log("Product already Added in Cart");
    } else {
      let cartData = await cart.create(req.body);
      console.log(cartData);
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.addedtocart = async (req, res) => {};
