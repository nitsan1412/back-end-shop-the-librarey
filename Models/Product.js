const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { Author } = require("./Author");

const PricesSchema = new Schema({
  priceHardCopy: Number,
  priceAudio: Number,
  priceDigitalCopy: Number,
  priceKindelCopy: Number,
  salePriceHardCopy: Number,
  salePriceAudio: Number,
  salePriceKindelCopy: Number,
  salePriceDigitalCopy: Number,
});

const ReviewSchema = new Schema({
  criticsName: String,
  review: String,
});

const productSchema = new Schema({
  id: Number,
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "authors",
    required: true,
  },
  coverImg: String,
  publicationYear: Number,
  pages: Number,
  publisher: String,
  publicationCountry: String,
  language: String,
  prices: PricesSchema,
  rating: Number,
  stock: Number,
  recomended: Boolean,
  new: Boolean,
  childrenRecomended: Boolean,
  onSale: Boolean,
  longInfo: String,
  preview: String,
  categories: [String],
  reviews: [ReviewSchema],
});

// productSchema.set('toJSON', {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//       ret.id = ret._id
//       delete ret._id
//   }
// });

module.exports = mongoose.model("Product", productSchema);
