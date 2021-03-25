const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const product = new Schema({
  todo: String,
});

module.exports = Product = mongoose.model("todo", product);
