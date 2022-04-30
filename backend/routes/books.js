const express = require("express");
const router = express.Router();
const axios = require("axios");
const Review = require("../models/Review");
const { ensureAuth } = require("../middleware/auth");

router.get("/:query", ensureAuth, async (req, res) => {
  try {
    const books = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      { params: { q: req.params.query, key: process.env.GOOGLE_API } }
    );
    return res.status(200).json({
      success: true,
      data: books.data,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "BAD REQUEST",
    });
  }
});

router.get("/book/:bookId", ensureAuth, async (req, res) => {
  try {
    const reviews = await Review.find({
      status: "public",
      bookId: req.params.bookId,
    })
      .populate("user")
      .sort({ createdAt: "desc" });
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "BAD REQUEST",
    });
  }
});

module.exports = router;
