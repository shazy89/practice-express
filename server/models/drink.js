const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const drink = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: String,
  price: String,
  sold: Number,
  inStock: Number,
  hidden: Boolean,
  date: { type: Date, default: Date.now },
});

module.exports = Drink = mongoose.model("drink", drink);
