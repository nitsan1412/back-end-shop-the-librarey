const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");

const { Product } = require("./Product");
const { User } = require("./User");

const Schema = mongoose.Schema;

// const cartItemSchema = new Schema();
const orderSchema = new Schema({
  id: String,
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
  cuponValue: Number,
});

module.exports = mongoose.model("Order", orderSchema);
// const CartItem = mongoose.model("CartItem", cartItemSchema);

// module.exports = {
//   Order,
//   CartItem,
// };
