const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading/trailing whitespace
  },
  tournamentId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Team", teamsSchema, "teams");
