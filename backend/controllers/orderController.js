const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  const order = new Order({
    user: req.user._id,
    orderItems,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

module.exports = { createOrder };