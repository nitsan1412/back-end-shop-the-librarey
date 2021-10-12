require("../data/database");
const express = require("express");
const router = express.Router();
// const productsModel = require("../Models/Product");
const productController = require("../controllers/product.controller");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const {
  productSchema,
  paramSchema,
} = require("../Models/Validation/ProductValidation");
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

router.get("/", productController.getAll);

router.get("/:id", productController.getOne);

router.post(
  "/",
  validator.body(productSchema),
  joiErrors,
  productController.create
);

router.put(
  "/:id",
  validator.body(productSchema),
  joiErrors,
  productController.update
);

router.delete("/", productController.delete);

module.exports = router;
