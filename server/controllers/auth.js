const User = require('../models/user');
const Otp = require('../models/Otp');
const JWT = require('jsonwebtoken');
require("dotenv").config();
 

// create a otp and save it to the database
exports.otp = async(req, res)=>{
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

    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    // save otp in db
    const OtpDetails = await Otp.create({
        email:email,
        otp:otp,
    });

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
       
       if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
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
       const OtpDetails = Otp.find({email}).sort({createdAt:-1}).limit(1);

       if(!OtpDetails || OtpDetails.otp!== otp)
       {
          return res.status(400).json({
            success: false,
            message: 'Please enter correct otp',
          });
       }

       const hashedPassword = bcrypt.hash(password,10);
       
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
        //contactNo,
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

      const userDetails = await User.findOne({email});

      if(!userDetails)
      {
        return res.status(400).json({
            success : false,
            message : "User not found",
        })
      }

      if(await bcrypt.compare(password, userDetails.password))
      {
        const payload={
            accountType : userDetails.accountType,
            id: userDetails._id,
            email:userDetails.email,
        }

        //create a token it returns a string 
        const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            userDetails,
        });
    }
    else
    {
        return res.status({
            success: false,
            message: "Password is incorrect",
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
    console.log(token);

    const updatedDetails = await User.findOneAndUpdate({email},
    {
        token:token,
        tokenExpiresIn: Date.now() + 5*60*1000,
    },
    {new:true});
 
    const url= `http://localhost:3000/update-password/${token}`

    await mailsend(email,"Password Mail Link",url);

    return res.json({
        success:true,
        message: 'reset link sent successfully',
        updatedDetails,
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

    if(password!==confirmPassword)
    {
        return res.json({
            success:false,
            message: 'Password do not match',
        });
    }

    const userDetails = await User.findOne({token:token});

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
    console.log(hashedPassword);
    
    await User.findOneAndUpdate({token:token, password:hashedPassword});

    return res.json({
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

