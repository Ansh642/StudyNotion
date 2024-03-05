const Course = require('../models/course');
const User = require('../models/user');
const Category= require('../models/category');
const {uploadImageToCloudinary} = require('../utils/imageUpload');
require("dotenv").config();

// create course
exports.createCourse = async(req,res)=>{
    try{
    const {courseName, courseDescription,whatwillyoulearn,price,category } = req.body;
    const thumbnail = req.files.image;

    const userId = req.user.id;

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

// fetch all courses
exports.getAllCourses = async(req,res)=>{
    
    try
    {
        const allCourses = await Course.find({}).populate("instructor").exec();

        if(!allCourses)
        {
            return res.status(404).json({
                success : false,
                message : 'Error in getting all Course details',
            });
        }

        return res.status(200).json({
            success: true,
            message: "All courses have been fetched successfully",
            allCourses,
        });
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : 'Error in finding all Courses',
        });
    }
}

//particular course Details
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

// Get all Registered Courses of a student
exports.studentCourses = async(req,res)=>{
    try{
        
        const userId = req.user.id;
        const allCourseDetails = await User.findById(userId).populate("courses").exec();
        
        //console.log(allCourseDetails);
        if(!allCourseDetails.courses)
        {
            return res.status(400).json({
                success:false,
                message: "No Courses found",
            });
        }

        return res.status(200).json({
            success:true,
            message: " Courses fetched successfully",
            data:allCourseDetails.courses,
        });

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message: "Error in getting student courses ",
        });
    }
}

