const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MessageDetail = require('../models/messageDetails');  // Path to the above schema
const router = require('express').Router();


// CREATE: Add a new message detail
router.post('/messageDetail', async (req, res) => {
  try {
    const messageDetail = new MessageDetail(req.body);
    const savedMessageDetail = await messageDetail.save();
    res.status(201).json(savedMessageDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all message details
router.get('/messageDetail', async (req, res) => {
  try {
    const messageDetails = await MessageDetail.find().populate('MessageID MemberID MessageTo');
    res.status(200).json(messageDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single message detail by ItemID
router.get('/messageDetail/:id', async (req, res) => {
  try {
    const messageDetail = await MessageDetail.findOne({ ItemID: req.params.id }).populate('MessageID MemberID MessageTo');
    if (!messageDetail) return res.status(404).json({ error: 'Message Detail not found' });
    res.status(200).json(messageDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a message detail by ItemID
router.put('/messageDetail/:id', async (req, res) => {
  try {
    const updatedMessageDetail = await MessageDetail.findOneAndUpdate({ ItemID: req.params.id }, req.body, { new: true });
    if (!updatedMessageDetail) return res.status(404).json({ error: 'Message Detail not found' });
    res.status(200).json(updatedMessageDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a message detail by ItemID
router.delete('/messageDetail/:id', async (req, res) => {
  try {
    const deletedMessageDetail = await MessageDetail.findOneAndDelete({ ItemID: req.params.id });
    if (!deletedMessageDetail) return res.status(404).json({ error: 'Message Detail not found' });
    res.status(200).json({ message: 'Message Detail deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;