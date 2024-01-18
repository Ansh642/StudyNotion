const jwt= require('jsonwebtoken');
const User= require('../models/user');
require("dotenv").config();


// auth
exports.auth = async (req, res, next) => {
    try{
        //extract token
        //console.log("object");

        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            
            // returns the decoded payload
            req.user = decode;
        }
        catch(err) {
            
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

// student route
exports.isStudent=(req, res,next)=>{
    try
    {
        const {accountType} = req.user;

        if(accountType !== "student")
        {
            return res.status(401).send({
                success: false,
                message: "This is protected route for students"
            });
        }
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Error while authenticating",
        });
    }
    next();
}

//instructor route
exports.isInstructor=(req, res,next)=>{
    try
    {
        const {accountType} = req.user;
        //console.log(accountType);

        if(accountType !== "instructor")
        {
            return res.status(401).send({
                success: false,
                message: "This is protected route for Instructor"
            });
        }
    }

    catch(err){
        return res.status(500).send({
            success: false,
            message: "Error while authenticating",
        });
    }
    //console.log("object");
    next();
}

// admin route
exports.isAdmin=(req, res,next)=>{

    try
    {
        const accountType = req.user.accountType;
        console.log(accountType);

        if(accountType !== "admin")
        {
            return res.status(401).send({
                success: false,
                message: "This is protected route for admin"
            });
        }
        
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Error while authenticating",
        });
    }
    next();
}



