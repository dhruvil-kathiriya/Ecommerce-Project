const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  created_date: {
    type: String,
    required: true,
  },
  updated_date: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", UserSchema);
module.exports = user;
