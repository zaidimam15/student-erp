const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["Assignment", "Paper", "Homework", "Project"], default: "Assignment" },
    className: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    assignedDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    fileUrl: { type: String, default: "" },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
