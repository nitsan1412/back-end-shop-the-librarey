const Joi = require("joi");

const userSchema = Joi.object({
  _v: Joi.any(),
  _id: Joi.string(),
  id: Joi.string(),
  active: Joi.boolean(),
  name: {
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(100),
  },
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phone: Joi.string().empty(""),
  // .pattern(new RegExp("^[0-9-+]{3,30}$")),
  role: Joi.string().pattern(new RegExp("(admin)|(user)|(customer)")),
  profilePicture: Joi.any(),
  address: {
    country: Joi.string().empty("").min(0).max(100),
    city: Joi.string().empty("").min(0).max(100),
    street: Joi.string().empty("").min(0).max(100),
    houseNumber: Joi.any(),
    appartment: Joi.any(),
    entrence: Joi.any(),
    zipcode: Joi.any(),
  },
  currCart: Joi.array().items(
    Joi.object({
      _v: Joi.any(),
      _id: Joi.string(),
      item: Joi.any(),
      amount: Joi.number().integer().min(1),
      format: Joi.string(),
    })
  ),
  currWishlist: Joi.array().items(
    Joi.object({
      _v: Joi.any(),
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
