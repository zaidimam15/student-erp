const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Income", "Expense"], required: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "Cheque", "Online", "Card"],
      default: "Cash",
    },
    recordedBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Finance", financeSchema);
