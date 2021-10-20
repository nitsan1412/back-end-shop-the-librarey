require("../data/database");
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const {
  orderSchema,
  paramSchema,
} = require("../Models/Validation/OrderValidation");
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

router.get("/", orderController.getAll);

router.get("/:id", orderController.getOne);

router.post(
  "/",
  validator.body(orderSchema),
  joiErrors,
  orderController.create
);

router.put(
  "/:id",
  validator.body(orderSchema),
  joiErrors,
  orderController.update
);

router.post("/perUser", orderController.perUser);


router.delete("/", orderController.delete);

module.exports = router;
