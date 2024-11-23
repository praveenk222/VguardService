const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MemberKYC = require('../models/memberKYC'); 
const router = require('express').Router();
 // Path to the above schema


// Connect to MongoDB


// CREATE: Add a new KYC entry
router.post('/memberKYC', async (req, res) => {
  try {
    const memberKYC = new MemberKYC(req.body);
    const savedMemberKYC = await memberKYC.save();
    res.status(201).json(savedMemberKYC);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all KYC entries
router.get('/memberKYC', async (req, res) => {
  try {
    const kycs = await MemberKYC.find();
    res.status(200).json(kycs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single KYC entry by UserID
router.get('/memberKYC/:id', async (req, res) => {
  try {
    const kyc = await MemberKYC.findOne({ UserID: req.params.id });
    if (!kyc) return res.status(404).json({ error: 'MemberKYC not found' });
    res.status(200).json(kyc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a KYC entry by UserID
router.put('/memberKYC/:id', async (req, res) => {
  try {
    const updatedKYC = await MemberKYC.findOneAndUpdate({ UserID: req.params.id }, req.body, { new: true });
    if (!updatedKYC) return res.status(404).json({ error: 'MemberKYC not found' });
    res.status(200).json(updatedKYC);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a KYC entry by UserID
router.delete('/memberKYC/:id', async (req, res) => {
  try {
    const deletedKYC = await MemberKYC.findOneAndDelete({ UserID: req.params.id });
    if (!deletedKYC) return res.status(404).json({ error: 'MemberKYC not found' });
    res.status(200).json({ message: 'MemberKYC deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
module.exports=router;
