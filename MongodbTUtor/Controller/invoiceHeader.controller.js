const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const InvoiceHeader = require('../models/invoiceHeader'); // Path to the above schema
const router = require('express').Router();


// CREATE: Add a new invoice header
router.post('/invoiceHeader', async (req, res) => {
  try {
    const invoiceHeader = new InvoiceHeader(req.body);
    const savedInvoiceHeader = await invoiceHeader.save();
    res.status(201).json(savedInvoiceHeader);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all invoice headers
router.get('/invoiceHeader', async (req, res) => {
  try {
    const invoiceHeaders = await InvoiceHeader.find();
    res.status(200).json(invoiceHeaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single invoice header by InvoiceID
router.get('/invoiceHeader/:id', async (req, res) => {
  try {
    const invoiceHeader = await InvoiceHeader.findOne({ InvoiceID: req.params.id });
    if (!invoiceHeader) return res.status(404).json({ error: 'InvoiceHeader not found' });
    res.status(200).json(invoiceHeader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update an invoice header by InvoiceID
router.put('/invoiceHeader/:id', async (req, res) => {
  try {
    const updatedInvoiceHeader = await InvoiceHeader.findOneAndUpdate({ InvoiceID: req.params.id }, req.body, { new: true });
    if (!updatedInvoiceHeader) return res.status(404).json({ error: 'InvoiceHeader not found' });
    res.status(200).json(updatedInvoiceHeader);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete an invoice header by InvoiceID
router.delete('/invoiceHeader/:id', async (req, res) => {
  try {
    const deletedInvoiceHeader = await InvoiceHeader.findOneAndDelete({ InvoiceID: req.params.id });
    if (!deletedInvoiceHeader) return res.status(404).json({ error: 'InvoiceHeader not found' });
    res.status(200).json({ message: 'InvoiceHeader deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
module.exports=router;