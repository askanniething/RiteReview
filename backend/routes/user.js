const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: "desc" });
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
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
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "BAD REQUEST",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "NO USER FOUND",
    });
  }
});

module.exports = router;
