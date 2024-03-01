const User = require('./models/userModel');
const {
  default: mongoose,
} = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("./config/index");

const connectToDatabase = async() => {
  try {
    
    const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
    // await User.deleteMany(); // Delete existing user documents
    // await User.collection.drop(); // Drop the collection
    console.log(`DB connected to host: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting DB: ${error}`);
  }
}

module.exports = { connectToDatabase };
