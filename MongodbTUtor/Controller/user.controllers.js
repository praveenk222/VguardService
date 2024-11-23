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
    
    User.find({email:req.body.email}).exec().then((result)=>{
        if(result.length<1){
         return res.json({success:false,message:'User not found'})
        }
        const user = result[0];
        bcrypt.compare(req.body.password,user.password,(err,ret)=>{
            if(ret){
                const payload={
                  userId:user._id
                }
                const token=jwt.sign(payload,"webBatch", { expiresIn: '2h' })
                return res.json({success:true,token:token,message:"login successfully"})
               
            }else{
                return res.json({success:false,message:"login failed"})
            }
        })
    }).catch(err=>{
        res.json({success:false,message:'Authentication failed'})
    })
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