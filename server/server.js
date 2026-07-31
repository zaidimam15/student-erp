require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resources = require("./routes/resourceRoutes");

const app = express();

// -------------------------------------
// CORS Configuration
// -------------------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://student-erp-jet.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman and Render health checks
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked request from: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// -------------------------------------
// Middleware
// -------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// -------------------------------------
// Root Route
// -------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Greenfield School ERP Backend is running 🚀",
    health: "/api/health",
  });
});

// -------------------------------------
// Health Check
// -------------------------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student ERP API is running",
  });
});

// -------------------------------------
// Routes
// -------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/students", resources.students);
app.use("/api/attendance", resources.attendance);
app.use("/api/attendance-log", resources.attendance);
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

// -------------------------------------
// API 404
// -------------------------------------
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// -------------------------------------
// Global Error Handler
// -------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// -------------------------------------
// Start Server
// -------------------------------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();