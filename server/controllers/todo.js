const Todo = require("../models/todo");

exports.todo = async function (req, res) {
  const { todo } = req.body;
  try {
    const newTodo = new Todo({ todo });

    await newTodo.save();
    res.json({ newTodo });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
