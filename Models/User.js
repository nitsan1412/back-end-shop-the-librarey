const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;
const { Product } = require("./Product");

// const cartItemSchemaUser = new Schema();

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
  currCart: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      amount: Number,
      format: String,
    },
  ],
  currWishlist: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      amount: Number,
      format: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
