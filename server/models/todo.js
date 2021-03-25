const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todo = new Schema({
  todo: String,
});

module.exports = Todo = mongoose.model("todo", todo);
