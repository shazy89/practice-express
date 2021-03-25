const Drink = require("../models/drink");

// Private - api/drink
exports.newDrink = async function (req, res) {
  const { name, type, price, sold, inStock, hidden } = req.body;

  try {
    const newDrink = new Drink({
      name,
      type,
      price,
      sold,
      inStock,
      hidden,
    });

    await newDrink.save();
    res.json({ newDrink });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
