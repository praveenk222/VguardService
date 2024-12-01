const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ProductMaster = require('../models/productMaster');
const Member = require('../models/user.model');
const router = require('express').Router();


// Connect to MongoDB


// CREATE: Add a new product
router.post('/productMasters', async (req, res) => {
  const { productData, userData } = req.body;

  try {
    // Save Product data
  console.log(req.body);
  console.log(req.body.productData);
    const product = new ProductMaster(productData);
    const savedProduct = await product.save();

    // Save User data
    const user = new Member(userData);
    const savedUser = await user.save();

    // Respond with saved data
    res.status(201).json({
      message: 'Data saved successfully',
      product: savedProduct,
      user: savedUser
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all products
router.get('/productMasters', async (req, res) => {
  try {
    const products = await ProductMaster.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a product by ID
router.get('/productMasters/:id', async (req, res) => {
  try {
    const product = await ProductMaster.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a product by ID
router.put('/productMasters/:id', async (req, res) => {
  try {
    const updatedProduct = await ProductMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a product by ID
router.delete('/productMasters/:id', async (req, res) => {
  try {
    const deletedProduct = await ProductMaster.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
module.exports  =router;
