const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({ username: String, password: String });
const User = mongoose.model("User", schemaUser);

module.exports = User;
