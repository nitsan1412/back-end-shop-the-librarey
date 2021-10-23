require("../data/database");
const express = require("express");
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
    const errors = err.error.details.map((err) => {
      const field = err.message.split('"')[1];
      const message = err.message.split('" ')[1];
      return { field, message };
    });
    res.status(400).json(errors);
  } else {
    next(err);
  }
};

const router = express.Router();

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
router.delete("/", authorController.delete);

module.exports = router;
