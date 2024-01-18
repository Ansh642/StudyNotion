const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim: true,
    },
    lastName:{
        type:String,
        //required: true,
        trim: true,
    },

    password: {
        type:String,
        required: true,
    },

    email:{
        type:String,
        required: true,
    },

    token:{
        type:String,
    },
    
    tokenExpiresIn: {
        type:Date,
    },

    accountType:{
        type:String,
        required: true,
        enum:["admin", "student", "instructor"],
    },

    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Profile",    // profile will be the name of the model which is being reffered here;
        required: true,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course", 
    }],

    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress", 
    }],

    image:{
        type:String,
        required:true,
    },

});

module.exports = mongoose.model("User", userSchema);




