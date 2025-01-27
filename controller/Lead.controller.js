const mongoose = require('mongoose');
const  {Lead  }= require('../models'); // Import the Lead model

// POST: Create a new Lead
const createLead = async (req, res) => {
  try {
    const { client_id, name, email, phone, message, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;

    const newLead = new Lead({
      client_id,
      name,
      email,
      phone,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content
    });

    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', data: newLead });
  } catch (error) {
    res.status(500).json({ error: 'Error creating lead', details: error });
  }
};

// GET: Fetch all Leads
const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leads', details: error });
  }
};

// GET: Fetch a Lead by ID
const getLeadById = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching lead', details: error });
  }
};

// PUT: Update a Lead by ID
const updateLead = async (req, res) => {
  const { id } = req.params;
  const { client_id, name, email, phone, message, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;

  try {
    const updatedLead = await Lead.findByIdAndUpdate(id, {
      client_id,
      name,
      email,
      phone,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content
    }, { new: true });

    if (!updatedLead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead updated successfully', data: updatedLead });
  } catch (error) {
    res.status(500).json({ error: 'Error updating lead', details: error });
  }
};

// DELETE: Remove a Lead by ID
const deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLead = await Lead.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting lead', details: error });
  }
};

// Exporting all controller methods
module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
};
