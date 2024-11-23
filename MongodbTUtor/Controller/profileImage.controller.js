const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ProfileImage = require('../models/profileImage');  // Path to the above schema

const router = require('express').Router();
// Connect to MongoDB


// CREATE: Add a new profile image
router.post('/profileImage', async (req, res) => {
  try {
    const profileImage = new ProfileImage(req.body);
    const savedProfileImage = await profileImage.save();
    res.status(201).json(savedProfileImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all profile images
router.get('/profileImage', async (req, res) => {
  try {
    const profileImages = await ProfileImage.find().populate('MemberID');
    res.status(200).json(profileImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single profile image by ImageID
router.get('/profileImage/:id', async (req, res) => {
  try {
    const profileImage = await ProfileImage.findOne({ ImageID: req.params.id }).populate('MemberID');
    if (!profileImage) return res.status(404).json({ error: 'Profile Image not found' });
    res.status(200).json(profileImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a profile image by ImageID
router.put('/profileImage/:id', async (req, res) => {
  try {
    const updatedProfileImage = await ProfileImage.findOneAndUpdate({ ImageID: req.params.id }, req.body, { new: true });
    if (!updatedProfileImage) return res.status(404).json({ error: 'Profile Image not found' });
    res.status(200).json(updatedProfileImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a profile image by ImageID
router.delete('/profileImage/:id', async (req, res) => {
  try {
    const deletedProfileImage = await ProfileImage.findOneAndDelete({ ImageID: req.params.id });
    if (!deletedProfileImage) return res.status(404).json({ error: 'Profile Image not found' });
    res.status(200).json({ message: 'Profile Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;