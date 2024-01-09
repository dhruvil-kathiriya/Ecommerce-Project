const express = require("express");
const routs = express.Router();
const Admin = require("../models/admin");
const adminController = require("../controller/admincontroller");
const passport = require("passport");

routs.get("/", async (req, res) => {
  return res.render("Admin_pages/Login");
});

routs.get("/dashboard", passport.checkAuth, adminController.dashboard);

routs.get("/add_admin", passport.checkAuth, adminController.add_admin);

routs.post(
  "/insert_admin",
  Admin.uploadAdminImage,
  adminController.insert_admin
);

routs.get("/view_admin", passport.checkAuth, adminController.view_admin);

routs.get("/view_profile", passport.checkAuth, adminController.view_profile);

routs.post(
  "/checklogin",
  passport.authenticate("local", { failureRedirect: "/admin/" }),
  adminController.checklogin
);

routs.get("/forgptpass", async (req, res) => {
  return res.render("Admin_pages/Forgot_pass");
});

routs.get("/setnewpassword", async (req, res) => {
  return res.render("Admin_pages/Setnewpassword");
});

routs.post("/Checkotp", adminController.Checkotp);

routs.post("/verifyotp", adminController.verifyotp);

routs.post("/updatepassword", adminController.updatepassword);

routs.get("/update_password", adminController.update_password);

routs.post("/updatenewpassword", adminController.updatenewpassword);

routs.get("/logout", async (req, res) => {
  req.session.destroy(); // To Remove Session Data From Browser
  res.clearCookie("Ecom");
  return res.redirect("/admin/");
});

routs.get("/isActive/:id", adminController.isActive);

routs.get("/deActive/:id", adminController.deActive);

routs.get("/deleteAdmin/:id", adminController.deleteAdmin);

routs.get("/updateAdmin/:id", adminController.updateAdmin);

routs.get("/edit_admin/:id", adminController.edit_admin);

routs.use("/category", passport.checkAuth, require("./category"));
routs.use("/subcategory", passport.checkAuth, require("./subcategory"));
routs.use("/extracategory", passport.checkAuth, require("./extracategory"));
routs.use("/brand", passport.checkAuth, require("./brand"));
routs.use("/type", passport.checkAuth, require("./type"));
routs.use("/product", passport.checkAuth, require("./product"));

module.exports = routs;
