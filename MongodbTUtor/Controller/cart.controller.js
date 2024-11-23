const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cart = require('../models/cart');  // Path to the above schema
const router = require('express').Router();

// CREATE: Add a new cart
router.post('/cart', async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all carts
router.get('/cart', async (req, res) => {
  try {
    const carts = await Cart.find().populate('ProductID SellerID MemberID');
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single cart by CartID
router.get('/cart/:id', async (req, res) => {
  try {
    const cart = await Cart.findOne({ CartID: req.params.id }).populate('ProductID SellerID MemberID');
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a cart by CartID
router.put('/cart/:id', async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate({ CartID: req.params.id }, req.body, { new: true });
    if (!updatedCart) return res.status(404).json({ error: 'Cart not found' });
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a cart by CartID
router.delete('/cart/:id', async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ CartID: req.params.id });
    if (!deletedCart) return res.status(404).json({ error: 'Cart not found' });
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;
