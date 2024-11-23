const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Review = require('../models/review');  // Path to the above schema
const router = require('express').Router();


// CREATE: Add a new review
router.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().populate('CustomerID ProductID');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single review by ReviewID
router.get('/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findOne({ ReviewID: req.params.id }).populate('CustomerID ProductID');
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a review by ReviewID
router.put('/reviews/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findOneAndUpdate({ ReviewID: req.params.id }, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ error: 'Review not found' });
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a review by ReviewID
router.delete('/reviews/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findOneAndDelete({ ReviewID: req.params.id });
    if (!deletedReview) return res.status(404).json({ error: 'Review not found' });
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
module.exports=router;
