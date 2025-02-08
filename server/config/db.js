// db.js
const mongoose = require("mongoose");

// Get the MongoDB URI from environment variables
const dbURI = process.env.DB_URI || "mongodb://localhost:27017/crud";

// Function to connect to the database
const connectDB = async () => {
  try {
    const db=await mongoose.connect(dbURI);
    console.log("Connected to MongoDB successfully! DB :- ".green.bgRed + db.connection.host);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
};

// Export the function for use in other parts of the application
module.exports = connectDB;
