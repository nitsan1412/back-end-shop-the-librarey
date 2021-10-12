const Joi = require("joi");

const ticketSchema = Joi.object({
  _id: Joi.string(),
  id: Joi.number(),
  status: Joi.string().pattern(new RegExp("(PENDING)|(ACCEPTED)|(REJECTED)")),
  user: Joi.any(),
  subject: Joi.string().pattern(
    new RegExp("(Orders)|(Products)|(TechnicalProblem)|(PersonalIsuue)|(Other)")
  ),
  date: Joi.date().less("now"),
  header: Joi.string().min(2).max(100),
  content: Joi.string(),
  response: Joi.string().empty(),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  ticketSchema,
  paramSchema,
};
