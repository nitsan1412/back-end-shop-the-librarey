const Joi = require("joi");

const postSchema = Joi.object({
  _id: Joi.string(),
  id: Joi.number(),
  writerUserId: Joi.number(),
  writer: {
    firstName: Joi.string().min(2).max(15),
    lastName: Joi.string().min(2).max(15),
  },
  date: Joi.date(),
  approved: Joi.boolean(),
  headline: Joi.string().min(2).max(100),
  text: Joi.string().min(10),
  comments: Joi.any(),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  postSchema,
  paramSchema,
};
