const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MessageHeader = require('../models/messageHeader');  // Path to the above schema

const router = require('express').Router();


// CREATE: Add a new message header
router.post('/messageHeader', async (req, res) => {
  try {
    const messageHeader = new MessageHeader(req.body);
    const savedMessageHeader = await messageHeader.save();
    res.status(201).json(savedMessageHeader);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all message headers
router.get('/messageHeader', async (req, res) => {
  try {
    const messageHeaders = await MessageHeader.find().populate('SenderID ReceiverID ProductID');
    res.status(200).json(messageHeaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single message header by MessageID
router.get('/messageHeader/:id', async (req, res) => {
  try {
    const messageHeader = await MessageHeader.findOne({ MessageID: req.params.id }).populate('SenderID ReceiverID ProductID');
    if (!messageHeader) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json(messageHeader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a message header by MessageID
router.put('/messageHeader/:id', async (req, res) => {
  try {
    const updatedMessageHeader = await MessageHeader.findOneAndUpdate({ MessageID: req.params.id }, req.body, { new: true });
    if (!updatedMessageHeader) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json(updatedMessageHeader);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a message header by MessageID
router.delete('/messageHeader/:id', async (req, res) => {
  try {
    const deletedMessageHeader = await MessageHeader.findOneAndDelete({ MessageID: req.params.id });
    if (!deletedMessageHeader) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;