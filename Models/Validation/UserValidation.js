const Joi = require("joi");

const userSchema = Joi.object({
  _id: Joi.string(),
  id: Joi.number(),
  active: Joi.boolean(),
  name: {
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(100).required(),
  },
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phone: Joi.string().pattern(new RegExp("^[0-9-+]{3,30}$")),
  role: Joi.string().pattern(new RegExp("(admin)|(user)|(customer)")),
  profilePicture: Joi.any(),
  address: {
    country: Joi.string().min(3).max(100),
    city: Joi.string().min(3).max(100),
    street: Joi.string().min(3).max(100),
    houseNumber: Joi.number().integer().min(1),
    appartment: Joi.any(),
    entrence: Joi.any(),
    zipcode: Joi.number().integer(),
  },
  currCart: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      item: Joi.any(),
      amount: Joi.number().integer().min(1),
      format: Joi.string(),
    })
  ),
  currWishlist: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      item: Joi.any(),
      amount: Joi.number().integer().min(1),
      format: Joi.string(),
    })
  ),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  userSchema,
  paramSchema,
};
