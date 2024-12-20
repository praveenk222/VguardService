const router = require('express').Router();
const Member = require('../models/user.model');
const bcrypt = require('bcrypt');

router.post('/members', async (req, res) => {
    console.log(req.body)
    try {
      const newMember = new Member({
        UserID: req.body.UserID,
        EmailID: req.body.EmailID,
        MobileNo: req.body.MobileNo,
        Password: req.body.Password,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MemberType: req.body.MemberType,
        OTP: req.body.OTP,
        IsOTPSent: req.body.IsOTPSent,
        OTPSentDate: req.body.OTPSentDate,
        IsResendOTP: req.body.IsResendOTP,
        IsOTPVerified: req.body.IsOTPVerified,
        IsEmailVerified: req.body.IsEmailVerified,
        IsActive: req.body.IsActive,
        CreatedOn: req.body.CreatedOn,
        ProfilePhoto: req.body.ProfilePhoto,
        Token: req.body.Token,
        ParentID: req.body.ParentID,
        IsRegisteredByMobile: req.body.IsRegisteredByMobile,
        PinCode:req.body.PinCode,
        UserType:req.body.UserType
        
      });
  
      // Save the member to the database
      console.log(newMember)
      const savedMember = await newMember.save();
      res.status(201).send(savedMember);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
  

router.post('/login',(req,res)=>{
    try{
console.log(req.body);
        const { UserName, Password } = req.body;
        
        if (!UserName || !Password) {
            return res.status(400).json({
                success: false,
                message: 'UserName (email or mobile number) and password are required'
            });
        }        
     
        Member.findOne({
            $or: [{ EmailID: UserName }, { MobileNo: UserName }]})
    .exec()
        .then((result)=>{
            console.log(result)
            if (!result) {
                return res.status(404).json({
                  success: false,
                  message: 'User not found'
                });
              }
          
              // Check if the account is active
              if (!result.IsActive) {
                return res.status(403).json({
                  success: false,
                  message: 'User account is inactive'
                });
              }
              let isPasswordValid=false;
              if (Password === result.Password) {
                isPasswordValid = true;
              }
              console.log()
              if (!isPasswordValid) {
                return res.status(401).json({
                  success: false,
                  message: 'Invalid password'
                });
              }
            res.json({success:true,data:result})
        }).catch((err)=>{
            res.json({success:false,message:err})
        })
    
} catch (error) {
  console.error('Error during login:', error);
  res.status(500).json({
    success: false,
    message: 'An error occurred during login',
    error: error.message
  });
}
});

router.get('/profile',(req,res)=>{
    const userId=req.userData.userId;
User.findById(userId)
.exec()
    .then((result)=>{
        res.json({success:true,data:result})
    }).catch((err)=>{
        res.json({success:false,message:"server error"})
    })
  
})
router.get('/users',(req,res)=>{
      Member.find()
        .sort({ CreatedOn: -1 }) // Sort by CreatedOn in descending order (-1 for latest first)

   
.exec()
    .then((result)=>{
        res.json({success:true,data:result})
    }).catch((err)=>{
        res.json({success:false,message:"server error"})
    })
  
})

router.get('/success', async (req, res, next) => {
    try {
        const user = await User.find({});
        res.status(200).json({ data: user, message: 'Authentication login successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports =router;