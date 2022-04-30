const express = require("express");
const Review = require("../models/Review");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

router.post("/", ensureAuth, async (req, res) => {
  try {
    const currentReview = await Review.findOne({
      bookId: req.body.bookId,
      user: req.user.id,
    });
    if (!currentReview) {
      let review = await Review.create({ ...req.body, user: req.user.id });
      await review.populate("user");
      return res.status(201).json({
        success: true,
        data: review,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "REVIEW ALREADY EXISTS",
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "BAD REQUEST",
    });
  }
});

router.get("/", ensureAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ status: "public" })
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

router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).populate("user");
    if (
      review.status === "private" &&
      review.user._id.toString() !== req.user.id
    ) {
      return res.status(400).json({
        success: false,
        error: "USER DOES NOT HAVE PERMISSIONS TO VIEW REVIEW",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: review,
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "BAD REQUEST",
    });
  }
});

router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user");
    if (!review) {
      return res.status(400).json({
        success: false,
        error: "REVIEW DOES NOT EXIST",
      });
    } else if (req.user.id !== review.user._id.toString()) {
      return res.status(400).json({
        success: false,
        error: "CANNOT EDIT REVIEW",
      });
    } else {
      let newReview = await Review.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, bookId: review.bookId },
        {
          new: true,
          runValidators: true,
        }
      );
      await newReview.populate("user");
      return res.status(200).json({
        success: true,
        data: newReview,
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "BAD REQUEST",
    });
  }
});

router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(400).json({
        success: false,
        error: "REVIEW DOES NOT EXIST",
      });
    } else if (req.user.id !== review.user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: "CANNOT DELETE REVIEW",
      });
    } else {
      await Review.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        data: {},
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "BAD REQUEST",
    });
  }
});

router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    if (req.params.userId === req.user._id.toString()) {
      const reviews = await Review.find({ user: req.params.userId })
        .populate("user")
        .sort({ createdAt: "desc" });
      return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    } else {
      const reviews = await Review.find({
        user: req.params.userId,
        status: "public",
      })
        .populate("user")
        .sort({ createdAt: "desc" });
      return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "BAD REQUEST",
    });
  }
});

router.get("/find/:bookId", ensureAuth, async (req, res) => {
  try {
    const currentReview = await Review.findOne({
      bookId: req.params.bookId,
      user: req.user.id,
    }).populate("user");
    if (currentReview) {
      return res.status(201).json({
        success: true,
        exist: true,
        data: currentReview,
      });
    } else {
      return res.status(202).json({
        success: true,
        exist: false,
        data: {},
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "BAD REQUEST",
    });
  }
});

module.exports = router;
