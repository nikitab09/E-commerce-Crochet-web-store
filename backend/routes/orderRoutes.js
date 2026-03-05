const express = require("express");
const { createOrder, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);

// ADMIN ROUTE
router.get("/", protect, admin, getAllOrders);

router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;