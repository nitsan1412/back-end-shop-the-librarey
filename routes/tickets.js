require("../data/database");
const express = require("express");
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
