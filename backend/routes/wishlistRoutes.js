const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

let wishlist = [];

router.get("/", protect, (req, res) => {
    res.json(wishlist);
});

router.post("/", protect, (req, res) => {
    wishlist.push(req.body);
    res.json(wishlist);
});

router.delete("/:id", protect, (req, res) => {
    wishlist = wishlist.filter(item => item._id !== req.params.id);
    res.json(wishlist);
});

module.exports = router;