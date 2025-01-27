const express = require('express');
const router = express.Router();
const{ LeadController} = require('../controller'); // Import the Lead controller

// POST: Create a new Lead
router.post('/lead', LeadController.createLead);

// GET: Fetch all Leads
router.get('/leads', LeadController.getAllLeads);

// GET: Fetch a Lead by ID
router.get('/lead/:id', LeadController.getLeadById);

// PUT: Update a Lead by ID
router.put('/lead/:id', LeadController.updateLead);

// DELETE: Remove a Lead by ID
router.delete('/lead/:id', LeadController.deleteLead);

module.exports = router;
