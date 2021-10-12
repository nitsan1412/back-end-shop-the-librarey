const Joi = require("joi");

const authorSchema = Joi.object({
  _id: Joi.any(),
  id: Joi.number(),
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(200),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  authorSchema,
  paramSchema,
};
