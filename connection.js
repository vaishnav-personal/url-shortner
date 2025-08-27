const mongoose = require("mongoose");

async function CreateMongoServer() {
  try {
    const mongoURL = process.env.MONGO_URL;
    console.log("🔗 Connecting to:", mongoURL);

    await mongoose.connect(mongoURL); // no options needed with modern Mongoose
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = CreateMongoServer;
