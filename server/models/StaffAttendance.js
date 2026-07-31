const mongoose = require("mongoose");

const staffAttendanceSchema = new mongoose.Schema(
  {
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
    staffName: { type: String, required: true },
    designation: { type: String, default: "" },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent", "Late", "Leave"], default: "Present" },
    checkIn: { type: String, default: "" },
    checkOut: { type: String, default: "" },
    remarks: { type: String, default: "" },
  },
  { timestamps: true }
);

staffAttendanceSchema.index({ staff: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("StaffAttendance", staffAttendanceSchema);
