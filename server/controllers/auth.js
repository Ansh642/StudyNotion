const User = require('../models/user');
const Otp = require('../models/Otp');
const JWT = require('jsonwebtoken');
require("dotenv").config();
const {mailsend} = require("../utils/mailsend");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
const crypto = require("crypto");

// create a otp and save it to the database
exports.sendotp = async(req, res)=>{
    try
    {
    const {email} = req.body;

    if(!email)
    {
        return res.status({
            success: false,
            message :"Please enter your email address",
        });
    }

    const UserDetails = await User.findOne({email});

    if(UserDetails)
    {
        return res.status(400).json({
            success: false,
            message :"User already exists",
        });
    }

    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, });

    // save otp in db
    const OtpDetails = await Otp.create({
        email:email,
        otp:otp,
    });

    //console.log(otp);

    return res.status(200).json({
        success: true,
        message :"Otp has been created and saved successfully",
        OtpDetails,
    });
   }

    catch(err)
    {
        return res.status(500).json({
            success: false,
            message :err.message,
        });
    }
}


exports.signup = async(req,res)=>{
    try{
       const {firstName,lastName,email,password,confirmPassword, accountType,otp} = req.body;
       newOtp =  otp.join('');

       if(!firstName || !lastName || !email || !password || !confirmPassword || !newOtp)
       {
        return res.status(400).json({
           success: false,
           message: 'Please enter all required fields',
        });
       }

       if(password !== confirmPassword)
       {
        return res.status(400).json({
            success: false,
            message: 'Please enter correct password',
        });
       }

       const userDetails = await User.findOne({email});

       if(userDetails)
       {
        return res.status(400).json({
            success: false,
            message: 'User already exists',
        });
       }

       // check for valid otp
       const OtpDetails = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);

       //console.log(OtpDetails[0].otp);
       if(!OtpDetails || OtpDetails[0].otp!== newOtp)
       {
          return res.status(400).json({
            success: false,
            message: 'Please enter correct otp',
          });
       }

       const hashedPassword = await bcrypt.hash(password,10);
       
       const profileDetails = await Profile.create({
        gender: null,
        about : null,
        dateOfBirth : null,
        number: null,
    });

    // create a new entry in db;
    const newUser= await User.create({
        firstName,
        lastName,
        email,
        accountType,
        password : hashedPassword,
        additionalDetails : profileDetails._id,
        image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });


    return res.status(200).json({
        success : true,
        message : 'User added successfully',
        newUser,
    });
  }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
}


exports.login =async(req,res)=>{
    try{
      const {email,password} = req.body;

      if(!email || !password)
      {
        return res.status(400).json({
            success : false,
            message : "Please enter complete details",
        });
      }

      const userDetails = await User.findOne({email}).populate("additionalDetails").exec();
      //console.log(userDetails);

      if(!userDetails)
      {
        return res.status(400).json({
            success : false,
            message : "User not found",
        })
      }

      if (await bcrypt.compare(password, userDetails.password)) {
        const token = JWT.sign(
            { email: userDetails.email, id: userDetails._id, accountType: userDetails.accountType },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );
 
        userDetails.password = null;
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            userDetails,
            token
        })

    
    } else {
        return res.status(401).json({
            success: false,
            message: `Password is incorrect`,
        });
    }
  }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
}


exports.changePassword = async(req,res)=>{
    try
    {
        const {oldPassword,newPassword,confirmPassword} = req.body;
        const userId= req.user.id;

        if(!oldPassword || !newPassword || !confirmPassword)
        {
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            });
        }

        const UserDetails = await User.findById(userId);

        const isPasswordMatch = await bcrypt.compare(oldPassword,UserDetails.password);
        
		if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "The password is incorrect"
            });
	    }

    
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Passwords do not match"
            });
        }

        const hashedPassword = bcrypt.hash(newPassword,10);

        await User.findByIdAndUpdate(userId,{password:hashedPassword},{new:true});

        return res.status(200).json({
            success : true,
            message : "Password updated successfully",
        });

        
    }
    catch(err){
        return res.status(500).json({
            success : true,
            message : err.message,
        });
    }
}


exports.resetPasswordToken= async(req,res)=>{

    try{
    const {email}=req.body;

    const user= User.findOne({email});
    if(!user)
    {
        return res.json({
            success: false,
            message: 'User not found',
        });
    }

    // generate a random token 
    const token = crypto.randomUUID();

    const updatedDetails = await User.findOneAndUpdate({email},
    {
        token:token,
        tokenExpiresIn: Date.now() + 5*60*1000,
    },
    {new:true});

    const url= `http://localhost:3000/update-password/${token}`

    const mail = await mailsend(email,'Password Mail Link',url);
    //console.log(mail);

    return res.status(200).json({
        success:true,
        message: 'Reset link sent successfully,check your email',
    });
}

    catch(err)
    {
        return res.json({
            success:false,
            message: 'Error while sending password link mail link',
        });
    }
}


exports.resetPassword = async(req,res)=>{

    try{
    const {password,confirmPassword,token} = req.body;
    //console.log(password);

    if(password!==confirmPassword)
    {
        return res.json({
            success:false,
            message: 'Password do not match',
        });
    }

    const userDetails = await User.findOne({token:token});
    //console.log(userDetails);

    if(!userDetails)
    {
        return res.json({
            success:false,
            message: 'User does not exist',
        });
    }

    if(userDetails.tokenExpiresIn < Date.now())
    {
        return res.json({
            success:false,
            message: 'Token is expired',
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    //console.log(hashedPassword);
    
    const newUserDetails = await User.findOneAndUpdate({token:token}, {password:hashedPassword},{new:true});
    console.log(newUserDetails);

    return res.status(200).json({
        success:true,
        message: 'Password updated successfully',
    });
 }

    catch(err){
        return res.json({
            success:false,
            message: 'Error updating password',
        });
    }
}

// incomplete
exports.contactUs = async (req,res)=>{
    try{
       //const userId = req.user.id;
       console.log("object")

       const {firstName,lastName,email,phoneNo , message} = req.body;
       
       if(!firstName || !lastName || !email || !message){
        return res.json({
            success : false,
            message: 'Enter complete details',
        });
       }

       const emailResponse = await mailsend(email, "E-mail for query" , message);

       console.log("Email sent successfully:", emailResponse.response);
    }
    catch(err){
        return res.json({
            success:false,
            message: 'Error  sending mail',
        });
    }
}







