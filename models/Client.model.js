const mongoose = require('mongoose');

// Define the schema
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes unnecessary whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    lowercase: true, // Converts email to lowercase
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email validation
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets current date
  },
});

// Create the model
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
