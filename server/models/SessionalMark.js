const mongoose = require("mongoose");

const sessionalMarkSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    studentName: { type: String, required: true },
    className: { type: String, required: true },
    subject: { type: String, required: true, trim: true },
    examName: { type: String, required: true, trim: true },
    marksObtained: { type: Number, required: true },
    maxMarks: { type: Number, required: true, default: 100 },
    grade: { type: String, default: "" },
    remarks: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SessionalMark", sessionalMarkSchema);
