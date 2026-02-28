const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);