const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }
  ],
  totalPrice: Number,
  address: String,
  paymentMethod: String,
  orderStatus: {
    type: String,
    default: "Processing"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);