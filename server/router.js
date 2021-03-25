const Authentication = require("./controllers/authentication");
const Todo = require("./controllers/todo");
const pasportService = require("./services/pasport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
  //app.get("/", requireAuth, function (req, res) {
  //  res.send({ hi: "there" });
  //});
  app.post("/signup", Authentication.signup);
  app.post("/api/todo", requireAuth, Todo.todo);
};
