const Joi = require("joi");

const productSchema = Joi.object({
  _v: Joi.any(),
  _id: Joi.string(),
  id: Joi.number(),
  title: Joi.string(),
  author: Joi.any(),
  coverImg: Joi.string(),
  publicationYear: Joi.number().integer().max(2021),
  pages: Joi.number().integer(),
  publisher: Joi.string(),
  publicationCountry: Joi.string(),
  language: Joi.string(),
  prices: Joi.object({
    priceHardCopy: Joi.number().min(1),
    priceAudio: Joi.number().min(1),
    priceDigitalCopy: Joi.number().min(1),
    priceKindelCopy: Joi.number().min(1),
    salePriceHardCopy: Joi.number().min(1),
    salePriceAudio: Joi.number().min(1),
    salePriceKindelCopy: Joi.number().min(1),
    salePriceDigitalCopy: Joi.number().min(1),
  }),
  rating: Joi.number().min(0).max(5),
  stock: Joi.number().integer(),
  recomended: Joi.boolean(),
  new: Joi.boolean(),
  childrenRecomended: Joi.boolean(),
  onSale: Joi.boolean(),
  longInfo: Joi.string(),
  preview: Joi.string(),
  categories: Joi.array().items(Joi.string()),
  reviews: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      id: Joi.number(),
      criticsName: Joi.string().min(2),
      review: Joi.string(),
    })
  ),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  productSchema,
  paramSchema,
};
