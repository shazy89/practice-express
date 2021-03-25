const Authentication = require("./controllers/authentication");
const Todo = require("./controllers/todo");
const Drink = require("./controllers/drink");
const pasportService = require("./services/pasport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
  //app.get("/", requireAuth, function (req, res) {
  //  res.send({ hi: "there" });
  //});
  app.post("/signup", Authentication.signup);
  app.post("/api/todo", requireAuth, Todo.todo);
  app.post("/api/drink", requireAuth, Drink.newDrink);
  app.get("/api/drinks", requireAuth, Drink.getDrinks);
  app.get("/api/drink/:name", requireAuth, Drink.getSelectedDrink);
  app.delete("/api/drink/:name", requireAuth, Drink.removeSelectedDrink);
};
