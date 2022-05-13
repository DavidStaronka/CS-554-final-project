const userRoutes = require("./users");
const characterRoutes = require("./characters");
const sessionRoutes = require('./sessions');
const profileRoutes = require('./profile');

const constructorMethod = (app) => {
  app.use("/users", userRoutes);
  app.use("/character", characterRoutes);
  app.use("/sessions", sessionRoutes);
  app.use("/profile", profileRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
