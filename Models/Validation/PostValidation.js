const Joi = require("joi");

const postSchema = Joi.object({
  _v: Joi.any(),
  _id: Joi.string(),
  id: Joi.number(),
  user: Joi.any(),
  date: Joi.date(),
  approved: Joi.boolean(),
  headline: Joi.string().min(2).max(100),
  text: Joi.string().min(10),
  comments: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      commentID: Joi.number(),
      approved: Joi.boolean(),
      user: Joi.any(),
      headline: Joi.string().min(2).max(100),
      text: Joi.string().min(10),
    })
  ),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  postSchema,
  paramSchema,
};
