const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;  // Set default to 5000 if not provided in .env

// Connect to the database
connectDB().then(() => {
  console.log("Database connected successfully");

  // Middleware
  app.use(cors());  // Allow cross-origin requests
  app.use(express.json());  // To parse incoming JSON requests

  // Import routes
  const { LeadRouter , ClientRouter  } = require('./routes');
  app.use('/health', (req, res) => {
    res.send('Server is running');
  });

  // app.use('/' , (req, res) => {
  //   res.send('Hello from lms server');
  // });
  
  app.use('/api', LeadRouter); 
  app.use('/api', ClientRouter);
  

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);  // Exit process with failure code
});
