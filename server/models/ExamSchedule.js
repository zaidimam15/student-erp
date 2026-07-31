const mongoose = require("mongoose");

const examScheduleSchema = new mongoose.Schema(
  {
    examName: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    examDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: String, default: "" },
    maxMarks: { type: Number, default: 100 },
    invigilator: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExamSchedule", examScheduleSchema);
