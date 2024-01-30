const Course = require('../models/course');
const User = require('../models/user');
const Category= require('../models/category');
const {uploadImageToCloudinary} = require('../utils/imageUpload');
require("dotenv").config();


exports.createCourse = async(req,res)=>{
    try{
    const {courseName, courseDescription,whatwillyoulearn,price,category } = req.body;
    const thumbnail = req.files.image;

    const userId = req.user.id;
    console.log(userId);

    if(!courseDescription  || !courseName || !whatwillyoulearn || !price || !category)
    {
        return res.status({
            success: false,
            message: 'Please fill in the complete details'
        });
    }

    const instructorDetails = await User.findById(userId);

    if(!instructorDetails){
        return res.status({
            success: false,
            message: 'No instructor found'
        });
    }

    const categoryDetails = await Category.findById(category);

    if(!categoryDetails)
    {
        return res.status({
            success: false,
            message: 'No such category found'
        });
    }

    // upload image file to cloundinary
    const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
    
    const newCourse = await Course.create({
        courseName,
        courseDescription,
        whatwillyoulearn,
        price,
        instructor: instructorDetails._id,
        category: categoryDetails._id,
        thumbnail: thumbnailImage.secure_url,
    });

    // now add the new course into the instructor list,
    const newUser = await User.findByIdAndUpdate({_id:instructorDetails._id},{
        $push:{
            courses: newCourse._id,
        }
    },{new:true});

    await Category.findByIdAndUpdate(category,{
        $push:{
            courses: newCourse._id,
        }
    });

    return res.status(200).json({
        success: true,
        message: 'Course created successfully',
        newCourse
    });
  }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getAllCourses = async(req,res)=>{
    try
    {
        const allCourses = await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            ratingAndReviews:true,
            instructor:true,
            studentsEnrolled:true,
        }).populate("instructor").exec();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : 'Error in creating new Course',
        });
    }
}

exports.getCourseDetails = async(req,res)=>{
    try
    {
        const {courseId} = req.body;
        //console.log(courseId);
        // finding all the details and sub details 
        const allDetails = await Course.findById(courseId).populate("instructor").populate("category")
        .populate({
            path : "courseContent",
            populate :{
                path : "subSection"
            }
        }).exec();

        if(!allDetails)
        {
            return res.status(404).json({
                success : false,
                message : 'Error in getting all Course details',
            });
        }

        return res.status(200).json({
            success:true,
            message: "Course details successfully fetched",
            allDetails
        });
    }

    catch(err)
    {
        return res.status(500).json({
            success:false,
            message: "Error in getting all Course details",
        });
    }
}




