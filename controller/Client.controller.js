const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  {Client } = require('../models');
require('dotenv').config(); 

// 1. Create a new client
const createClient = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
    });

    await newClient.save();
    res.status(201).json({ message: 'Client created successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating client' });
  }
};

// 2. Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching clients' });
  }
};

// 3. Get a client by ID
const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching client' });
  }
};

// 4. Update a client
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.name = name || client.name;
    client.email = email || client.email;
    if (password) {
      client.password = await bcrypt.hash(password, 10);
    }

    await client.save();
    res.status(200).json({ message: 'Client updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating client' });
  }
};

// 5. Delete a client
const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting client' });
  }
};

// 6. Login and JWT Authentication
 // Ensure this is added at the top of the file

const loginClient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if JWT_SECRET_KEY is defined
    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ error: 'JWT_SECRET_KEY is not defined' });
    }

    // Sign the JWT token
    const token = jwt.sign(
      { clientId: client._id, email: client.email },
      process.env.JWT_SECRET_KEY,  // Use the correct key here
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Login error:", err);  // Log the detailed error
    res.status(500).json({ error: 'Server error during login' });
  }
};



module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  loginClient,
};
