const Joi = require("joi");

const orderSchema = Joi.object({
  _v: Joi.any(),
  _id: Joi.string(),
  id: Joi.string(),
  reference: Joi.string().min(2).max(100),
  user: Joi.any(),
  orderDate: Joi.date().less("now"),
  deliveryDate: Joi.date().less("now"),
  products: Joi.array().items(
    Joi.object({
      _v: Joi.any(),
      _id: Joi.string(),
      item: Joi.any(),
      amount: Joi.number().integer().min(1),
      format: Joi.string(),
    })
  ),
  status: Joi.string().pattern(
    new RegExp(
      "(approved)|(being_handled)|(ordered)|(cancelled)|(delivered)|(recieved_by_client)"
    )
  ),
  active: Joi.boolean(),
  totalSum: Joi.number(),
  deliveryOption: Joi.string()
    .empty("")
    .pattern(
      new RegExp(
        "(Mail-Box-Delivery)|(Door-to-Door-Delivery)|(24-Hours-Delivery)|()"
      )
    ),
  dliveryPrice: Joi.number().empty(),
  cuponValue: Joi.number().empty(),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  orderSchema,
  paramSchema,
};
