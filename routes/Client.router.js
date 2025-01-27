const express = require('express');
const router = express.Router();
const  { ClientController }  = require('../controller');
const verifyToken = require('../middlewares/verifyToken');

// 1. Create a new client
router.post('/add-clients', ClientController.createClient);

// 2. Get all clients
router.get('/clients', ClientController.getAllClients);

// 3. Get a client by ID
router.get('/clients/:id', ClientController.getClientById);

// 4. Update a client
router.put('/clients/:id', ClientController.updateClient);

// 5. Delete a client
router.delete('/clients/:id', ClientController.deleteClient);

// 6. Login and JWT Authentication
router.post('/auth/login', ClientController.loginClient);

// Example of a protected route
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', client: req.client });
});

module.exports = router;
