require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resources = require("./routes/resourceRoutes");

const app = express();

// ---- Middleware ----
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ---- Routes ----
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/students", resources.students);
app.use("/api/attendance", resources.attendance);
app.use("/api/attendance-log", resources.attendance); // same data, log/report view on the client
app.use("/api/timetable", resources.timetable);
app.use("/api/class-fees", resources.classFees);
app.use("/api/sessional-marks", resources.sessionalMarks);
app.use("/api/notices", resources.notices);
app.use("/api/assignments", resources.assignments);
app.use("/api/staff", resources.staff);
app.use("/api/staff-attendance", resources.staffAttendance);
app.use("/api/finance", resources.finance);
app.use("/api/exam-schedule", resources.examSchedule);
app.use("/api/academic-results", resources.academicResults);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Student ERP API is running" });
});

// 404 handler
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
