const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading/trailing whitespace
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true,
  },
  isStadiumOwner: {
    type: Boolean,
    required: false,
  },
  // stadiumId:[{
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'Stadium' // Reference the User model
  // }]
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema, "users");
