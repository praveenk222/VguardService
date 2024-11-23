const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Wishlist = require('../models/wishlist'); 
 // Path to the above schema
const router = require('express').Router();




// Connect to MongoDB


// CREATE: Add a new Wishlist entry
router.post('/wishlist', async (req, res) => {
  try {
    const wishlist = new Wishlist(req.body);
    const savedWishlist = await wishlist.save();
    res.status(201).json(savedWishlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all Wishlist entries
router.get('/wishlist', async (req, res) => {
  try {
    const wishlists = await Wishlist.find().populate('CustomerID ProductID');
    res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single Wishlist entry by WishlistID
router.get('/wishlist/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ WishlistID: req.params.id }).populate('CustomerID ProductID');
    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a Wishlist entry by WishlistID
router.put('/wishlist/:id', async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate({ WishlistID: req.params.id }, req.body, { new: true });
    if (!updatedWishlist) return res.status(404).json({ error: 'Wishlist not found' });
    res.status(200).json(updatedWishlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a Wishlist entry by WishlistID
router.delete('/wishlist/:id', async (req, res) => {
  try {
    const deletedWishlist = await Wishlist.findOneAndDelete({ WishlistID: req.params.id });
    if (!deletedWishlist) return res.status(404).json({ error: 'Wishlist not found' });
    res.status(200).json({ message: 'Wishlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
module.exports=router;