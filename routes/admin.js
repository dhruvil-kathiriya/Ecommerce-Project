const express = require("express");
const routes = express.Router();
const Admin = require("../models/admin")
const adminController = require("../controller/admincontroller");
const passport = require("passport");

routes.get("/", async (req, res) => {
    return res.render('Admin_pages/Login');
});

routes.get("/dashboard", passport.checkAuth, adminController.dashboard);

routes.get("/add_admin", passport.checkAuth, adminController.add_admin);

routes.post("/insert_admin", Admin.uploadAdminImage, adminController.insert_admin)

routes.get("/view_admin", passport.checkAuth, adminController.view_admin);

routes.get("/view_profile", passport.checkAuth, adminController.view_profile);

routes.get("/editProfile", passport.checkAuth, adminController.editProfile);

routes.post("/checklogin", passport.authenticate('local', { failureRedirect: "/admin/" }), adminController.checklogin);

routes.get("/forgptpass", async (req, res) => {
    return res.render("Admin_pages/Setnewpassword");
});

routes.post("/verifyotp", async (req, res) => {
    return res.render("Admin_pages/Verifyotp");
});

routes.get("/setnewpassword", async (req, res) => {
    return res.render("Admin_pages/Setnewpassword")
});

routes.post("/updatepassword", adminController.updatepassword);

routes.get("/logout", async (req, res) => {
    req.session.destroy()
    return res.redirect("/admin/");
});

routes.use("/category", passport.checkAuth, require("./category"));
routes.use("/subcategory", passport.checkAuth, require("./subcategory"));
routes.use("/extracategory", passport.checkAuth, require("./extracategory"));
routes.use("/brand", passport.checkAuth, require("./brand"));
routes.use("/type", passport.checkAuth, require("./type"));
routes.use("/product", passport.checkAuth, require("./product"));

module.exports = routes;