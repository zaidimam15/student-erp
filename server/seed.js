// Creates a default admin account so you can log in immediately.
// Run with: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

const run = async () => {
  await connectDB();

  const email = "admin@school.com";
  const existing = await User.findOne({ email });

  if (existing) {
    console.log("Admin user already exists:", email);
  } else {
    await User.create({
      name: "Admin",
      email,
      password: "admin123",
      role: "admin",
      designation: "Principal / Administrator",
    });
    console.log("Default admin created:");
    console.log("  email:    admin@school.com");
    console.log("  password: admin123");
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
