const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  quantity: {
    type: Number
  },
  status: {
    type: String
  },
  create_date: {
    type: String
  },
  updated_date: {
    type: String
  },
});

const cart = mongoose.model("Cart", CartSchema);
module.exports = cart;
