const express = require("express");
const { createOrder, getAllOrders, updateOrderStatus, getMyOrders } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);

// USER ORDERS
router.get("/myorders", protect, getMyOrders);

// ADMIN ROUTES
router.get("/", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;