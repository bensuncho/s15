const mongoose = require("mongoose");
// import mongoose from mongoose;

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI).then(() => {
      console.log("Database is connected ...(ok)");
    });
  } catch (e) {
    console.log("Database is not connected => " + e.message);
  }
};
