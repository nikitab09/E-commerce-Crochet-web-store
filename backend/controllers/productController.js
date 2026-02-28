const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Create product (Admin)
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};