const Drink = require("../models/drink");

// Private -(New drink)  api/drink
exports.newDrink = async function (req, res) {
  const { name, type, price, sold, inStock, hidden } = req.body;

  const drinkFields = {};
  drinkFields.user = req.user.id;
  drinkFields.name = name;
  if (type) drinkFields.type = type;
  if (price) drinkFields.price = price;
  if (sold) drinkFields.sold = sold;
  if (inStock) drinkFields.inStock = inStock;
  if (hidden) drinkFields.hidden = hidden;

  try {
    let drink = await Drink.findOne({ name });

    if (drink) {
      // Update
      console.log("Update");
      drink = await Drink.findOneAndUpdate(
        { name },
        { $set: drinkFields },
        { new: true }
      );
      return res.json(drink);
    }
    // Create
    const newDrink = new Drink(drinkFields);
    console.log("NEW");
    await newDrink.save();
    res.json({ newDrink });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
// Private -(Get all drinks)  api/drinks
exports.getDrinks = async function (req, res) {
  try {
    const drinks = await Drink.find().sort({ date: -1 });
    res.json(drinks);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// Private -(Get one drink)  api/drinks
exports.getSelectedDrink = async function ({ params: { name } }, res) {
  try {
    const drink = await Drink.findOne({
      name,
    });
    res.json(drink);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// Private - (delete one drink)  api/drinks
exports.removeSelectedDrink = async function ({ params: { name } }, res) {
  try {
    await Drink.findOneAndRemove({ name });

    res.json({ msg: "Product deleted" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
