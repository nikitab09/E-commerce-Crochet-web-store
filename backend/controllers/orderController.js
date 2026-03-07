const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {

    const { items, totalPrice, paymentMethod, address } = req.body;

    const products = items.map((item) => ({
      product: item._id,
      quantity: item.quantity || 1
    }));

    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
      paymentMethod,
      address: address
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Order failed" });

  }
};

const getAllOrders = async (req, res) => {

  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product");

  res.json(orders);
};

const updateOrderStatus = async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (order) {

    order.orderStatus = req.body.orderStatus;

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } else {

    res.status(404).json({ message: "Order not found" });

  }
};

const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({ user: req.user._id })
      .populate("products.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: "Failed to fetch orders" });

  }
};
const cancelOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = "Cancelled";

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {

    res.status(500).json({ message: "Cancel failed" });

  }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus, getMyOrders, cancelOrder };