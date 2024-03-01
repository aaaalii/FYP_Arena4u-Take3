// to start server use command npm run start, just checking
// drboM1G8JrQkfYT5
// ezp6MjIsM9Tbh9DF
const express = require("express");
const { connectToDatabase, initializeDatabase } = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const {PORT} = require('./config/index');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

// For testing purpose, to send data in form of json
app.use(express.json());

// Serve static files from the frontend/public directory
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(bodyParser.urlencoded({ extended: true })); // Enable parsing of form data

// Connect to MongoDB
connectToDatabase();

app.use(router);

// Error Handler
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));

