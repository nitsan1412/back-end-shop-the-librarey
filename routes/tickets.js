require("../data/database");
const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const {
  ticketSchema,
  paramSchema,
} = require("../Models/Validation/TicketValidation");
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

router.get("/", ticketController.getAll);

router.get("/:id", ticketController.getOne);

router.post(
  "/",
  validator.body(ticketSchema),
  joiErrors,
  ticketController.create
);

router.put(
  "/:id",
  validator.body(ticketSchema),
  joiErrors,
  ticketController.update
);

router.delete("/", ticketController.delete);

module.exports = router;
