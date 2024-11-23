const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Address = require('../models/address');  // Path to the above schema
const router = require('express').Router();


// Connect to MongoDB

// CREATE: Add a new address
router.post('/addresses', async (req, res) => {
  try {
    const address = new Address(req.body);
    const savedAddress = await address.save();
    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all addresses
router.get('/addresses', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single address by ID
router.get('/addresses/:id', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update an address by ID
router.put('/addresses/:id', async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAddress) return res.status(404).json({ error: 'Address not found' });
    res.status(200).json(updatedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete an address by ID
router.delete('/addresses/:id', async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress) return res.status(404).json({ error: 'Address not found' });
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;
