const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },

  
  length: { type: String },
  width: { type: String },
  fabric: { type: String },
  wash: { type: String },

  reviews: [
    {
      user: String,
      rating: Number,
      comment: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);