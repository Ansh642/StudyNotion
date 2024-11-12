const User = require('../models/user');
const Otp = require('../models/Otp');
const JWT = require('jsonwebtoken');
require("dotenv").config();
const {mailsend} = require("../utils/mailsend");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
const crypto = require("crypto");
const { contactUsEmail } = require("../templates/contactFormRes");

// create a otp and save it to the database
exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please enter your email address",
            });
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Generate a 6-digit OTP
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        // Save OTP in the database
        const otpDetails = await Otp.create({ email, otp });

        // Ideally, send OTP via email service here

        return res.status(200).json({
            success: true,
            message: "OTP has been created and sent successfully",
        });
    } catch (err) {
        console.error("Error in sending OTP:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while sending OTP",
            error: err.message,
        });
    }
};


exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;

        // Concatenate OTP if provided as array
        const newOtp = otp?.join('');

        // Check if all required fields are provided
        if (!firstName || !lastName || !email || !password || !confirmPassword || !newOtp) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all required fields',
            });
        }

        // Verify that password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match',
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Validate OTP
        const [latestOtp] = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (!latestOtp || latestOtp.otp !== newOtp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP',
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a profile with default values
        const profileDetails = await Profile.create({
            gender: null,
            about: null,
            dateOfBirth: null,
            number: null,
        });

        // Create the new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            password: hashedPassword,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                accountType: newUser.accountType,
                image: newUser.image,
            },
        });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred during signup",
            error: err.message,
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password",
            });
        }

        const userDetails = await User.findOne({ email }).populate("additionalDetails").exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, userDetails.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        const payload = {
            email: userDetails.email,
            id: userDetails._id,
            accountType: userDetails.accountType,
        };

        const token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        userDetails.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: userDetails,
            token,
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
            error: err.message,
        });
    }
};


exports.changePassword = async(req,res)=>{
    try
    {
        const {oldPassword,newPassword} = req.body;
        const userId= req.user.id;

        if(!oldPassword || !newPassword )
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
    
        // if(newPassword !== confirmPassword){
        //     return res.status(400).json({
        //         success : false,
        //         message : "Passwords do not match"
        //     });
        // }

        const hashedPassword = await bcrypt.hash(newPassword,10);
        
        const newUser = await User.findByIdAndUpdate(userId,{ password: hashedPassword },{ new: true });

        return res.status(200).json({
            success : true,
            message : "Password updated successfully",
            newUser
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

exports.contactUs = async (req, res) => {
    const { email, firstname, lastname, message, phoneNo, countrycode } = req.body

    console.log(req.body);

    try {
      const emailRes = await mailsend(
        email,
        "Your Data send successfully",
        contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
      )
      console.log("Email Res ", emailRes)
      return res.json({
        success: true,
        message: "Email send successfully",
      })
    } 
    catch (error) {
      console.log("Error", error)
      console.log("Error message :", error.message)
      return res.json({
        success: false,
        message: "Something went wrong...",
      })
    }
}
  



