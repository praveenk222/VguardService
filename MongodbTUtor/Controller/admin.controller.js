const router = require('express').Router();
const Member = require('../models/user.model');
const ProductMaster = require('../models/productMaster');

// Connect to MongoDB

// CREATE: Add a new address
router.get('/dashboard', async (req, res) => {
  try {
    const [activeUsersCount, activeProductsCount] = await Promise.all([
      Member.countDocuments({ IsActive: true }), // Count active users
      ProductMaster.countDocuments({ IsActive: true }) // Count active products
    ]);

    res.status(200).json({
      success: true,
      data: {
        activeUsersCount,
        activeProductsCount
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});


module.exports=router;
