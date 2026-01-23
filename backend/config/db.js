const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("Conection Failed");
  }
};

module.exports = { connectDB };
