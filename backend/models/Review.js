const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  bookImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    enum: [1, 2, 3, 4, 5],
  },
  body: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
