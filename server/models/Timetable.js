const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    className: { type: String, required: true, trim: true },
    section: { type: String, default: "A", trim: true },
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      required: true,
    },
    subject: { type: String, required: true, trim: true },
    teacher: { type: String, default: "" },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
