const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const MemberController = require('./Controller/user.controllers');
const ProductImageController = require('./Controller/productImageController');
const ProductMasterController = require('./Controller/product.controller');
const AddressController = require('./Controller/address.controller');
const MemberKYCController = require('./Controller/memberKYC.controller');
const WishListController = require('./Controller/wishlist.controller');
const ReviewController = require('./Controller/productReview.controller');
const CartController = require('./Controller/cart.controller');
const messageHeaderController = require('./Controller/messageHeader.controller');
const messageDetailsController = require('./Controller/messageDetails.controller');
const notificationController = require('./Controller/notification.controller');
const profileImageController = require('./Controller/profileImage.controller');
const orderDetailsController = require('./Controller/orderdetails.controller');
const lookupController = require('./Controller/config_lookup.controller');
const stockController = require('./Controller/stock.controller');
const invoiceController = require('./Controller/invoiceHeader.controller');
const invoiceDetailsController = require('./Controller/invoiceDetails.controller');
const batteryRegisterMasterController = require('./Controller/batteryregister.controller');
const adminController = require('./Controller/admin.controller');
const app=express()


const uri = 'mongodb://localhost:27017/vbattery';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error('Error connecting to MongoDB Atlas with Mongoose:', error);
  });
  db.once('open', () => {
    console.log('Connected to MongoDB Atlas with Mongoose');
  });
  
  app.use(cors());
  app.use(bodyParser.json());
  // app.use(fileUpload({ createParentPath: true }));
  app.use(express.json());
  app.use(express. urlencoded({extended:false}))
  
  
  app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
app.use('/api',MemberController);
app.use('/api',ProductImageController);
app.use('/api',ProductMasterController);
app.use('/api',AddressController);
app.use('/api',MemberKYCController);
app.use('/api',WishListController);
app.use('/api',ReviewController);
app.use('/api',CartController);
app.use('/api',messageHeaderController);
app.use('/api',messageDetailsController);
app.use('/api',notificationController);
app.use('/api',profileImageController);
app.use('/api',orderDetailsController);
app.use('/api',lookupController);
app.use('/api',stockController);
app.use('/api',invoiceController);
app.use('/api',invoiceDetailsController);
app.use('/api',batteryRegisterMasterController);
app.use('/api',adminController);
app.listen(3001,()=>{console.log("server is running")})