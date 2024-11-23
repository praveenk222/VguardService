const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Notification = require('../models/notification');  // Path to the above schema

const router = require('express').Router();

// CREATE: Add a new notification
router.post('/notification', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all notifications
router.get('/notification', async (req, res) => {
  try {
    const notifications = await Notification.find().populate('MemberID SenderID');
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single notification by NotificationID
router.get('/notification/:id', async (req, res) => {
  try {
    const notification = await Notification.findOne({ NotificationID: req.params.id }).populate('MemberID SenderID');
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a notification by NotificationID
router.put('/notification/:id', async (req, res) => {
  try {
    const updatedNotification = await Notification.findOneAndUpdate({ NotificationID: req.params.id }, req.body, { new: true });
    if (!updatedNotification) return res.status(404).json({ error: 'Notification not found' });
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a notification by NotificationID
router.delete('/notification/:id', async (req, res) => {
  try {
    const deletedNotification = await Notification.findOneAndDelete({ NotificationID: req.params.id });
    if (!deletedNotification) return res.status(404).json({ error: 'Notification not found' });
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
module.exports=router;