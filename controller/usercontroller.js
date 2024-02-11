const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const product = require("../models/product");
const User = require("../models/user");
const cart = require("../models/cart");
const order = require("../models/order");
const bcrypt = require("bcrypt");
const session = require("express-session");
var stripe = require("stripe")("sk_test_wFSjCKx4AW07JCc87b2fUwhH00zzjnRSJv");

module.exports.home = async (req, res) => {
  try {
    let catData = await category.find({ isActive: true });
    let subcatData = await subcategory.find({ isActive: true });
    let extracatData = await extracategory.find({ isActive: true });
    let productData = await product.find({ isActive: true });
    let cartData = "";
    if (req.isAuthenticated()) {
      cartData = await cart
        .find({ userId: req.user.id, status: "pending" })
        .populate("productId");
    }
    return res.render("User_pages/dashboard", {
      catData: catData,
      subcatData: subcatData,
      extracatData: extracatData,
      productData: productData,
      cartData: cartData,
      totalPro: cartData.length,
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
      totalPro: cartData.length,
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
      totalPro: 0,
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
    console.log(req.body);
    console.log(req.params);

    var incart = await cart.findOne({
      productId: req.body.productId,
      userId: req.user.id,
    });
    if (incart) {
      console.log("Product already Added in Cart");
      return res.redirect("back");
    } else {
      // console.log(req.user);
      req.body.userId = req.user.id;
      req.body.status = "pending";
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
    let cartData = "";
    if (req.isAuthenticated()) {
      cartData = await cart
        .find({ userId: req.user.id, status: "pending" })
        .populate("productId");
    }
    let finalTotal = 0;
    let total = 0;
    for (let cart of cartData) {
      total = parseInt(cart.productId.product_price) * parseInt(cart.quantity);
      finalTotal += total;
    }
    //Everythings are in this page
    return res.render("User_pages/checkout", {
      cartData: cartData,
      catData: catData,
      subcatData: subcatData,
      extracatData: extracatData,
      finalTotal: finalTotal,
      totalPro: cartData.length,
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
    let cartData = await cart.findByIdAndDelete(req.params.id);
    return res.redirect("back");
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};

module.exports.DeleteAll = async (req, res) => {
  try {
    await cart.deleteMany({
      userId: req.user.id,
    });
    return res.redirect("back");
  } catch (err) {
    if (err) {
      console.log(err);
      return res.redirect("back");
    }
  }
};

module.exports.productQuantityTotal = async (req, res) => {
  try {
    let cartdata = await cart.findById(req.query.id);
    if (cartdata) {
      cartdata.quantity = req.query.qua;
      let editData = await cart.findByIdAndUpdate(req.query.id, cartdata);
      if (editData) {
        let newData = await cart
          .findById(req.query.id)
          .populate("productId")
          .exec();
        let totalprice = newData.productId.product_price * newData.quantity;
        let jsonData = `<span id="proTotal-${req.query.pos}">${totalprice}</span>`;
        return res.json(jsonData);
      } else {
        console.log("data not updated");
        return res.redirect("back");
      }
    } else {
      console.log("data Not Found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
//run 1 time
module.exports.payment = async (req, res) => {
  try {
    var countCart = await cart
      .find({ userId: req.user.id, status: "pending" })
      .countDocuments();
    var cartPendingData = await cart
      .find({ userId: req.user.id, status: "pending" })
      .populate("productId")
      .exec();
    var cartPendingData2 = await cart
      .find({ userId: req.user.id, status: "pending" })
      .populate("productId")
      .exec();
    var sub = 0;
    for (var i = 0; i < cartPendingData2.length; i++) {
      sub =
        sub +
        cartPendingData2[i].quantity *
          cartPendingData2[i].productId.product_price;
    }

    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Gourav Hammad",
        address: {
          line1: "TC 9/4 Old MES colony",
          postal_code: "452331",
          city: "Indore",
          state: "Madhya Pradesh",
          country: "India",
        },
      })
      .then((customer) => {
        return stripe.charges.create({
          amount: sub, // Charging Rs 25
          description: "Web Development Product",
          currency: "INR",
          customer: customer.id,
        });
      })
      .then(async (charge) => {
        var cartid = [];
        var proid = [];

        cartPendingData.forEach((v, i) => {
          cartid.push(v.id);
          proid.push(v.productId.id);
        });

        req.body.userId = req.user.id;
        req.body.productId = proid;
        req.body.status = "confirm";
        req.body.cartId = cartid;

        var or = await order.create(req.body);

        if (or) {
          cartPendingData.map(async (v, i) => {
            await cart.findByIdAndUpdate(v.id, { status: "confirm" });
          });
          return res.redirect("/");
        }
      })
      .catch((err) => {
        console.log(err); // If some error occurs
      });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
