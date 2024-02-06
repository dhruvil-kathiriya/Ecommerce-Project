const express = require("express");
const routs = express.Router();
const usercontroller = require("../controller/usercontroller");
const GoogleStrategy = require("../config/google_oauth");
const passport = require("passport");

routs.get("/", usercontroller.home);

routs.get("/productlist/:id", usercontroller.productlist);

routs.get("/userlogin", usercontroller.userlogin);
routs.post("/userlogin", async (req, res) => {
  return res.redirect("/userlogin");
});

routs.post(
  "/login",
  passport.authenticate("user", { failureRedirect: "/userlogin" }),
  usercontroller.login
);

routs.post("/createAccount", usercontroller.createAccount);

routs.get("/logout", async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

routs.post(
  "/addProducttocart",
  passport.checkAthuntication,
  usercontroller.addProducttocart
);

routs.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

routs.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/userlogin" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = routs;
