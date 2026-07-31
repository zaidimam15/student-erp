const mongoose = require("mongoose");

const classFeeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    studentName: { type: String, required: true },
    className: { type: String, required: true },
    feeType: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    dueDate: { type: Date, required: true },
    paidDate: { type: Date },
    status: { type: String, enum: ["Paid", "Unpaid", "Partial", "Overdue"], default: "Unpaid" },
    remarks: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassFee", classFeeSchema);
