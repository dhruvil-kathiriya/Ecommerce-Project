const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const product = require("../models/product");
const User = require("../models/user");
const cart = require("../models/cart");
const bcrypt = require("bcrypt");
const session = require("express-session");

module.exports.home = async (req, res) => {
  try {
    let catData = await category.find({ isActive: true });
    let subcatData = await subcategory.find({ isActive: true });
    let extracatData = await extracategory.find({ isActive: true });
    let productData = await product.find({ isActive: true });
    console.log(req.body);
    let cartData = "";
    let availcart = await cart.find({});
    if (!availcart) {
      let cartData = await cart
        .find({ userId: req.user.id, status: "pending" })
        .populate("productId");
      console.log(cartData);
    }
    return res.render("User_pages/dashboard", {
      catData: catData,
      subcatData: subcatData,
      extracatData: extracatData,
      productData: productData,
      cartData: cartData,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};

module.exports.productlist = async (req, res) => {
  try {
    let catData = await category.find({ isActive: true });
    let subcatData = await subcategory.find({ isActive: true });
    let extracatData = await extracategory.find({ isActive: true });
    let cartData = await cart.find();
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
      cartData: cartData,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};

module.exports.userlogin = async (req, res) => {
  try {
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
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
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
      req.body.password = await bcrypt.hash(req.body.password, 10);
      req.body.created_date = new Date().toLocaleString();
      req.body.updated_date = new Date().toLocaleString();
      let userData = await User.create(req.body);
      if (userData) {
        console.log("User Registered Successfully");
        return res.redirect("/userlogin");
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
    var incart = await cart.findOne({
      productId: req.params.id,
      userId: req.user.id,
    });
    if (incart) {
      console.log("Product already Added in Cart");
    } else {
      // console.log(req.user);
      req.body.userId = req.user.id;
      req.body.status = "pending";
      req.body.quantity = 1;
      req.body.created_date = new Date().toLocaleString();
      req.body.updated_date = new Date().toLocaleString();

      await cart.create(req.body);
      console.log("Product Added to Cart");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.checkout = async (req, res) => {
  try {
    let catData = await category.find({ isActive: true });
    let subcatData = await subcategory.find({ isActive: true });
    let extracatData = await extracategory.find({ isActive: true });
    // let productData = await product.find({ isActive: true });
    let cartData = await cart
      .find({ userId: req.user.id, status: "pending" })
      .populate("productId");

    return res.render("User_pages/checkout", {
      cartData: cartData,
      catData: catData,
      subcatData: subcatData,
      extracatData: extracatData,
    });
  } catch (err) {
    if (err) {
      console.log(err, "Something went Wrong");
      return res.redirect("back");
    }
  }
};

module.exports.deleteone = async (req, res) => {
  try {
    let cartData = await cart.deleteOne(req.params.id);
    console.log(cartData);
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};

module.exports.DeleteAll = async (req, res) => {
  try {
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};
