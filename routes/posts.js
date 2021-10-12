require("../data/database");

const express = require("express");
const router = express.Router();
// const postsModel = require("../Models/Post");

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
    const errors = [];

    err.error.details.forEach((err) => {
      const error = {};
      error.field = err.message.split('"')[1];
      error.message = err.message.split('" ')[1];
      errors.push(error);
    });

    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({ messages: errors });
  } else {
    // pass on to another error handler
    next(err);
  }
};

router.get("/", postController.getAll);

router.get("/:id", postController.getOne);

router.post("/", validator.body(postSchema), joiErrors, postController.create);

router.put(
  "/:id",
  validator.body(postSchema),
  joiErrors,
  postController.update
);

// router.post("/", postController.create);

// router.put("/:id", postController.update);

router.delete("/", postController.delete);

module.exports = router;
