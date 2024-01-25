const mongoose = require("mongoose");
const multer = require("multer");

const imagePath = "/uploads/AdminImages";
const path = require("path");

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  hobby: {
    type: Array,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
  },
  admin_image: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  created_date: {
    type: String,
  },
  updated_date: {
    type: String,
  },
});

const ImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", imagePath));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

AdminSchema.statics.uploadAdminImage = multer({ storage: ImageStorage }).single(
  "admin_image"
);
AdminSchema.statics.imageAdminPath = imagePath;

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
