const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;
const router = require('express').Router();



// Product Image Schema
const productImageSchema = new mongoose.Schema({
  ProductID: { type: Number, required: true },
  ImageName: { type: String },
  IsActive: { type: Boolean },
  ContentType: { type: Number },
  CreatedOn: { type: Date, default: Date.now }
});

// Product Image Model
const ProductImage = mongoose.model('ProductImage', productImageSchema);

// CREATE: Add a new product image
router.post('/productImages', async (req, res) => {
  try {
    const productImage = new ProductImage(req.body);
    const savedImage = await productImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all product images
router.get('/productImages', async (req, res) => {
  try {
    const productImages = await ProductImage.find();
    res.status(200).json(productImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a product image by ID
router.get('/productImages/:id', async (req, res) => {
  try {
    const productImage = await ProductImage.findById(req.params.id);
    if (!productImage) return res.status(404).json({ error: 'Product Image not found' });
    res.status(200).json(productImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a product image by ID
router.put('/productImages/:id', async (req, res) => {
  try {
    const updatedImage = await ProductImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedImage) return res.status(404).json({ error: 'Product Image not found' });
    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a product image by ID
router.delete('/productImages/:id', async (req, res) => {
  try {
    const deletedImage = await ProductImage.findByIdAndDelete(req.params.id);
    if (!deletedImage) return res.status(404).json({ error: 'Product Image not found' });
    res.status(200).json({ message: 'Product Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports =router;