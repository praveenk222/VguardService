const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BatteryProduct = require('../models/batteryRegisterMaster');
const router = require('express').Router();


// Connect to MongoDB


// CREATE: Add a new product
router.post('/batteryMaster', async (req, res) => {

  try {
    // Save Product data
  console.log(req.body);

    const product = new BatteryProduct(req.body);
    const savedProduct = await product.save();
    // Respond with saved data
    res.status(201).json({
      message: 'Data saved successfully',
      product: savedProduct,
    });
  } catch (err) {
    res.status(400).json({message: 'failed', error: err.message });
  }
});

// READ: Get all products
router.get('/batteryMaster', async (req, res) => {
  try {
    const products = await BatteryProduct.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function getLoginDetails(serialNo, mobileNo) {
  try {
    const user = await BatteryProduct.findOne({
      $or: [
        { BatterySerialNo: serialNo },
        { MobileNo: mobileNo }
      ]
    });
console.log(user);
console.log(serialNo,mobileNo);

    if (user) {
      return {
        success: true,
        message: "User found",
        data: user
      };
    } else {
      return {
        success: false,
        message: "No user found with the provided Serial Number and Mobile Number"
      };
    }
  } catch (error) {
    console.error("Error fetching login details: ", error);
    return {
      success: false,
      message: "An error occurred while fetching login details"
    };
  }
}
// READ: Get a product by ID
router.post('/batteryMaster/Login', async (req, res) => {
  const serialNo = req.body.BatterySerialNo; // Replace with the actual BatterySerialNo
  const mobileNo = req.body.MobileNo;    // Replace with the actual MobileNo
  console.log(req.body);

  const result = await getLoginDetails(serialNo, mobileNo);
  console.log(result);
  res.status(200).json(result);
});
router.get('/batteryMaster/:id', async (req, res) => {
  try {
    const product = await BatteryProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a product by ID
router.put('/batteryMaster/:id', async (req, res) => {
  try {
    const updatedProduct = await BatteryProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a product by ID
router.delete('/batteryMaster/:id', async (req, res) => {
  try {
    const deletedProduct = await BatteryProduct.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
module.exports  =router;
