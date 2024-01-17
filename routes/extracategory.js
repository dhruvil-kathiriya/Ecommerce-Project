const express = require("express");
const routs = express.Router();
const extracategorycontroller = require("../controller/extracategorycontroller");
const passport = require("passport");

routs.get(
  "/add_extracategory",
  passport.checkAuth,
  extracategorycontroller.add_extracategory
);

routs.get(
  "/view_extracategory",
  passport.checkAuth,
  extracategorycontroller.view_extracategory
);

routs.post(
  "/insert_extracategory",
  extracategorycontroller.insert_extracategory
);

routs.get("/isActive/:id", extracategorycontroller.isActive);

routs.get("/deActive/:id", extracategorycontroller.deActive);

routs.get(
  "/deleteextracategory/:id",
  extracategorycontroller.deleteextracategory
);

routs.post("/getsubcategoryData", extracategorycontroller.getsubcategoryData);

routs.get(
  "/updateextracategory/:id",
  extracategorycontroller.updateextracategory
);

routs.post("/editextracategory/:id", extracategorycontroller.editextracategory);

module.exports = routs;
