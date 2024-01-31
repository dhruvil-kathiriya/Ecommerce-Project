const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  created_date: {
    type: String,
  },
  updated_date: {
    type: String,
  },
});

const user = mongoose.model("User", UserSchema);
module.exports = user;
