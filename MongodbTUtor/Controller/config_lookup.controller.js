const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Lookup = require('../models/config.lookup');  // Path to the above schema

const router = require('express').Router();

// CREATE: Add a new lookup
router.post('/lookup', async (req, res) => {
  try {
    const lookup = new Lookup(req.body);
    const savedLookup = await lookup.save();
    res.status(201).json(savedLookup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all lookups
router.get('/lookup', async (req, res) => {
  try {
    const lookups = await Lookup.find();
    res.status(200).json(lookups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single lookup by LookupID
router.get('/lookup/:id', async (req, res) => {
  try {
    const lookup = await Lookup.findOne({ LookupID: req.params.id });
    if (!lookup) return res.status(404).json({ error: 'Lookup not found' });
    res.status(200).json(lookup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a lookup by LookupID
router.put('/lookup/:id', async (req, res) => {
  try {
    const updatedLookup = await Lookup.findOneAndUpdate({ LookupID: req.params.id }, req.body, { new: true });
    if (!updatedLookup) return res.status(404).json({ error: 'Lookup not found' });
    res.status(200).json(updatedLookup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a lookup by LookupID
router.delete('/lookup/:id', async (req, res) => {
  try {
    const deletedLookup = await Lookup.findOneAndDelete({ LookupID: req.params.id });
    if (!deletedLookup) return res.status(404).json({ error: 'Lookup not found' });
    res.status(200).json({ message: 'Lookup deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;