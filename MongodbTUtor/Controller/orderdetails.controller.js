const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const OrderDetail = require('../models/orderdetails');  // Path to the above schema
const router = require('express').Router();

// CREATE: Add a new order detail
router.post('/orderDetail', async (req, res) => {
  try {
    const orderDetail = new OrderDetail(req.body);
    const savedOrderDetail = await orderDetail.save();
    res.status(201).json(savedOrderDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all order details
router.get('/orderDetail', async (req, res) => {
  try {
    const orderDetails = await OrderDetail.find().populate('OrderID ProductID');
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single order detail by OrderDetailsID
router.get('/orderDetail/:id', async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findOne({ OrderDetailsID: req.params.id }).populate('OrderID ProductID');
    if (!orderDetail) return res.status(404).json({ error: 'Order Detail not found' });
    res.status(200).json(orderDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update an order detail by OrderDetailsID
router.put('/orderDetail/:id', async (req, res) => {
  try {
    const updatedOrderDetail = await OrderDetail.findOneAndUpdate({ OrderDetailsID: req.params.id }, req.body, { new: true });
    if (!updatedOrderDetail) return res.status(404).json({ error: 'Order Detail not found' });
    res.status(200).json(updatedOrderDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete an order detail by OrderDetailsID
router.delete('/orderDetail/:id', async (req, res) => {
  try {
    const deletedOrderDetail = await OrderDetail.findOneAndDelete({ OrderDetailsID: req.params.id });
    if (!deletedOrderDetail) return res.status(404).json({ error: 'Order Detail not found' });
    res.status(200).json({ message: 'Order Detail deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;