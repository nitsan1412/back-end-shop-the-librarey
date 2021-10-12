require("../data/database");
const express = require("express");
const router = express.Router();
// const authorsModel = require("../Models/Author");
const authorController = require("../controllers/author.controller");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  authorSchema,
  paramSchema,
} = require("../Models/Validation/AuthorValidation");

const joiErrors = function (err, req, res, next) {
  if (err && err.error && err.error.isJoi) {
    console.log(err.error);
    const errors = [];

    err.error.details.forEach((err) => {
      const error = {};
      error.field = err.message.split('"')[1];
      error.message = err.message.split('" ')[1];
      errors.push(error);
    });

    // we had a joi error, let's return a custom 400 json response
    res.status(400).json(errors);
  } else {
    // pass on to another error handler
    next(err);
  }
};
router.get("/", authorController.getAll);

router.get("/:id", authorController.getOne);

router.post(
  "/",
  validator.body(authorSchema),
  joiErrors,
  authorController.create
);

router.put(
  "/:id",
  validator.body(authorSchema),
  joiErrors,
  authorController.update
);

// router.post("/", authorController.create);

// router.put("/:id", authorController.update);

router.delete("/", authorController.delete);

module.exports = router;
