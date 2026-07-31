const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    audience: {
      type: String,
      enum: ["All", "Students", "Staff", "Parents"],
      default: "All",
    },
    priority: { type: String, enum: ["Low", "Normal", "High", "Urgent"], default: "Normal" },
    publishDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    postedBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
