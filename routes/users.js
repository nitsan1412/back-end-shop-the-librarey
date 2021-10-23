require("../data/database");
const express = require("express");
const router = express.Router();
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

router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.post("/", validator.body(userSchema), joiErrors, userController.create);
router.put(
  "/:id",
  validator.body(userSchema),
  joiErrors,
  userController.update
);
router.post("/login", userController.login);
router.delete("/", userController.delete);

module.exports = router;
