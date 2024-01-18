const mongoose=require('mongoose');

const courseSchema= new mongoose.Schema({

    courseName:{
        type:String,
        required:true,
        trim:true
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true
    },
    whatwillyoulearn:{
        type:String,
        required:true,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews",
    }],
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        
    },
    tag:{
        type:[String],
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },

    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }],
    instructions:{
        type:String,

    },
    status:{
        type:String,
        enum:["Draft","Published"]
    },

});


module.exports =  mongoose.model("Course", courseSchema);

