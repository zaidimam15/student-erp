const express = require("express");
const buildController = require("../controllers/genericController");
const { protect } = require("../middleware/auth");

// Creates a fully-wired CRUD router for a given Mongoose model.
const buildRouter = (Model, options = {}) => {
  const router = express.Router();
  const { getAll, getOne, create, update, remove } = buildController(Model, options);

  router.use(protect);

  router.route("/").get(getAll).post(create);
  router.route("/:id").get(getOne).put(update).delete(remove);

  return router;
};

module.exports = buildRouter;
