const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use Google's public DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🚀 Connecting to MongoDB...");
    console.log("📌 URI Loaded:", !!process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ MongoDB Connection Error");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Name:", error.name);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    process.exit(1);
  }
};

module.exports = connectDB;