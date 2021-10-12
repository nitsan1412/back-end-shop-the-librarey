const mongoose = require("mongoose");
const { Product } = require("./Product");
const { User } = require("./User");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  amount: Number,
  format: String,
});
const orderSchema = new Schema({
  id: Number,
  reference: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  orderDate: String,
  deliveryDate: String,
  products: [cartItemSchema],
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
