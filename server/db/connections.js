require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URI + process.env.DB_NAME
    );
    console.log(
      "MongoDB connected successfully with " + db?.connection?.db?.databaseName
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
