const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const querySchema = new Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Query: { type: String, required: true },
  QueryStatus: { type: String, default: "Unread" },
});

module.exports = model("query", querySchema);
