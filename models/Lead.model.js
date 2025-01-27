const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Assuming the client is another collection, you can adjust this as per your schema
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  utm_source: {
    type: String
  },
  utm_medium: {
    type: String
  },
  utm_campaign: {
    type: String
  },
  utm_term: {
    type: String
  },
  utm_content: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
