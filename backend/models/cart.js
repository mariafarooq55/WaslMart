const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const CartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  cartItem: [],
  totalPrice: Number,
  totalQuantity: Number,
});

module.exports = model("cart", CartSchema);
