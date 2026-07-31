const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    admissionNo: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    rollNo: { type: String, trim: true },
    className: { type: String, required: true, trim: true },
    section: { type: String, default: "A", trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male" },
    guardianName: { type: String, default: "" },
    guardianPhone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    admissionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Active", "Inactive", "Graduated"], default: "Active" },
    photo: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
