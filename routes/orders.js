require("../data/database");
const express = require("express");
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
