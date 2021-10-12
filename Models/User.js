const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { Products } = require("./Product");
// const { CartItem } = require("./Order");

const cartItemSchemaUser = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  amount: Number,
  format: String,
  totalSum: Number,
});

const userSchema = new Schema({
  id: Number,
  active: Boolean,
  name: {
    firstName: String,
    lastName: String,
  },
  email: String,
  password: String,
  phone: String,
  role: String,
  profilePicture: String,
  address: {
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    appartment: Number,
    entrence: String,
    zipcode: Number,
  },
  currCart: [cartItemSchemaUser],
  currWishlist: [cartItemSchemaUser],
});

module.exports = mongoose.model("User", userSchema);
