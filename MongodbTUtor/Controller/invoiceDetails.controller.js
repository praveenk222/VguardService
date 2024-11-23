const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const InvoiceDetail = require('../models/invoiceDetails'); // Path to the above schema

const router = require('express').Router();
// CREATE: Add a new invoice detail
router.post('/invoiceDetail', async (req, res) => {
  try {
    const invoiceDetail = new InvoiceDetail(req.body);
    const savedInvoiceDetail = await invoiceDetail.save();
    res.status(201).json(savedInvoiceDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all invoice details
router.get('/invoiceDetail', async (req, res) => {
  try {
    const invoiceDetails = await InvoiceDetail.find();
    res.status(200).json(invoiceDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single invoice detail by ItemID
router.get('/invoiceDetail/:id', async (req, res) => {
  try {
    const invoiceDetail = await InvoiceDetail.findOne({ ItemID: req.params.id });
    if (!invoiceDetail) return res.status(404).json({ error: 'InvoiceDetail not found' });
    res.status(200).json(invoiceDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update an invoice detail by ItemID
router.put('/invoiceDetail/:id', async (req, res) => {
  try {
    const updatedInvoiceDetail = await InvoiceDetail.findOneAndUpdate({ ItemID: req.params.id }, req.body, { new: true });
    if (!updatedInvoiceDetail) return res.status(404).json({ error: 'InvoiceDetail not found' });
    res.status(200).json(updatedInvoiceDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete an invoice detail by ItemID
router.delete('/invoiceDetail/:id', async (req, res) => {
  try {
    const deletedInvoiceDetail = await InvoiceDetail.findOneAndDelete({ ItemID: req.params.id });
    if (!deletedInvoiceDetail) return res.status(404).json({ error: 'InvoiceDetail not found' });
    res.status(200).json({ message: 'InvoiceDetail deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;
