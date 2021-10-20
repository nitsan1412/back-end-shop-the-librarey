require("../data/database");
const express = require("express");
const router = express.Router();
// const usersModel = require("../Models/User");
const userController = require("../controllers/user.controller");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  userSchema,
  paramSchema,
} = require("../Models/Validation/UserValidation");

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
router.get("/", userController.getAll);

router.get("/:id", userController.getOne);

router.post("/", validator.body(userSchema), joiErrors, userController.create);

router.put(
  "/:id",
  validator.body(userSchema),
  joiErrors,
  userController.update
);

router.patch(
  "/:id",
  validator.body(userSchema),
  joiErrors,
  userController.patch
);

router.post("/login", userController.login);

// router.post("/", userController.create);

// router.put("/:id", userController.update);

router.delete("/", userController.delete);

module.exports = router;
