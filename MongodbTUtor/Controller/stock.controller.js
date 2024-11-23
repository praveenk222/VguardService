const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Stock = require('../models/stock');  // Path to the above schema

const router = require('express').Router();
// CREATE: Add a new stock
router.post('/stock', async (req, res) => {
  try {
    const stock = new Stock(req.body);
    const savedStock = await stock.save();
    res.status(201).json(savedStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all stocks
router.get('/stock', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single stock by StockID
router.get('/stock/:id', async (req, res) => {
  try {
    const stock = await Stock.findOne({ StockID: req.params.id });
    if (!stock) return res.status(404).json({ error: 'Stock not found' });
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a stock by StockID
router.put('/stock/:id', async (req, res) => {
  try {
    const updatedStock = await Stock.findOneAndUpdate({ StockID: req.params.id }, req.body, { new: true });
    if (!updatedStock) return res.status(404).json({ error: 'Stock not found' });
    res.status(200).json(updatedStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a stock by StockID
router.delete('/stock/:id', async (req, res) => {
  try {
    const deletedStock = await Stock.findOneAndDelete({ StockID: req.params.id });
    if (!deletedStock) return res.status(404).json({ error: 'Stock not found' });
    res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;