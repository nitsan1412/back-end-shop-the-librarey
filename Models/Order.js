const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");

const { Product } = require("./Product");
const { User } = require("./User");

const Schema = mongoose.Schema;

// const cartItemSchema = new Schema();
const orderSchema = new Schema({
  id: Number,
  reference: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: String,
  deliveryDate: String,
  products: [
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
  status: String,
  active: Boolean,
  totalSum: Number,
  deliveryOption: String,
  dliveryPrice: Number,
  cuponValue: String,
});

module.exports = mongoose.model("Order", orderSchema);
// const CartItem = mongoose.model("CartItem", cartItemSchema);

// module.exports = {
//   Order,
//   CartItem,
// };
