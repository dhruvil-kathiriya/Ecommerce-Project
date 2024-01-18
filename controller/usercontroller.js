const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const product = require("../models/product");
const User = require("../models/user");
const session = require("express-session");

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
  return res.render("User_pages/userlogin", {
    catData: catData,
    subcatData: subcatData,
    extracatData: extracatData,
    productData: productData,
  });
};

module.exports.login = async (req, res) => {
  try {
    let userData = await User.findOne({
      email: req.body.email,
    });
    if (userData) {
      if (userData.password == req.body.password) {
        req.session.User = userData;
        console.log(req.session);
        return res.redirect("/");
      } else {
        console.log("Password Does Not Match");
        return res.redirect("back");
      }
    } else {
      console.log("User Does Not Exist! Please SignUp First");
      return res.redirect("back");
    }
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
