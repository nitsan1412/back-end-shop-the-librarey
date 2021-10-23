const express = require("express");
require("../data/database");
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
