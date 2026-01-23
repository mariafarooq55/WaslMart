const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productCategory: { type: String, required: true },
  productStatus: { type: String, default: "Out-Of-Stock" },
  productImage: { type: String, require: true },
});

module.exports = model("product", productSchema);
