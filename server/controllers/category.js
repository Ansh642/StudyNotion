const Category = require("../models/category");
const Course = require("../models/course");

exports.createCategory = async(req,res)=>{
    try{
        const {name,description} = req.body;

    if(!description || !name){
        return res.status(400).json({
            success: false,
            message :"Please enter complete details",
        });
    }

    const categoryDetails = await Category.create({name,description});
    console.log(categoryDetails);

    return res.status(200).json({
        success : true,
        message : "Category created successfully",
    });
  }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message,
        });
    }
}

exports.showAllCategories=async(req,res)=>{
    try{
        const allCategory = await Category.find({},{
            name:true,
            description:true,
        });

        return res.status(200).send({
            success: true,
            message: 'Categories returned successfully',
            allCategory,
        });
    }
 
    catch(err){
        return res.status(500).json({
            success: false,
            message:"An error occurred while displaying all categories",
        });
    }
}


exports.categoryPageDetails = async (req,res)=>{
    try{
    const {categoryId} = req.body;

    const allCourse = Course.findById(categoryId).populate("Course").exec();
    
    if(!allCourse){
        return res.status(400).json({
            success: false,
            message: 'No courses found for particular category',
        });
    }

    // get courses from different categories
    const otherCourses = await Course.find({
        _id : {$ne : categoryId},
    }).populate("Course").exec();


    // get all top selling courses
    const topCourses = Course.find({}).sort({studentsEnrolled : -1}).limit(10);

    return res.status(200).json({
        success: true,
        message: 'All courses fetched successfully',
    });

  }
   catch(err){
    return res.status(500).json({
        success: false,
        message: err.message,
    });
   }
}

