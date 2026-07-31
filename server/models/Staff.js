const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    staffId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    department: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    joiningDate: { type: Date, default: Date.now },
    salary: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive", "On Leave"], default: "Active" },
    photo: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
