const express = require("express");
const routs = express.Router();
const usercontroller = require("../controller/usercontroller");
const passport = require("passport");

routs.get("/", usercontroller.home);

routs.get("/productlist/:id", usercontroller.productlist);

routs.get("/userlogin", usercontroller.userlogin);

routs.post(
  "/login",
  passport.authenticate("user", { failureRedirect: "/userlogin" }),
  usercontroller.login
);

routs.post("/createAccount", usercontroller.createAccount);

routs.post(
  "/addProducttocart",
  passport.checkAthuntication,
  usercontroller.addProducttocart
);

module.exports = routs;
