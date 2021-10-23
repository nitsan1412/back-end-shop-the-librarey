require("../data/database");
const express = require("express");
const postController = require("../controllers/post.controller");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  postSchema,
  paramSchema,
} = require("../Models/Validation/PostValidation");

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

router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.post("/", validator.body(postSchema), joiErrors, postController.create);
router.put(
  "/:id",
  validator.body(postSchema),
  joiErrors,
  postController.update
);
router.delete("/", postController.delete);

module.exports = router;
