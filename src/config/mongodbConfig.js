const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
  try {
    await mongoose.connect(`${mongoUri}`, clientOptions);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;