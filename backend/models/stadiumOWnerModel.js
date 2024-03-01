const mongoose = require("mongoose");

const stadiumOwnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading/trailing whitespace
  },
  userId:{
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i, // Validate phone number format
  },
  password: {
    type: String,
    required: true,
  },
  
}, {timestamps: true});

module.exports = mongoose.model("User", stadiumOwnerSchema, "users");
