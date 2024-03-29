const Rating = require("../models/rating");
const Course = require("../models/course");
const { default: mongoose } = require("mongoose");

exports.createRating = async(req,res)=>{
    try{

    const userId = req.user.id;
    const {rating,review,courseId} = req.body;

    if(!rating || !review || !courseId)
    {
        return res.status(400).json({
            success: false,
            message : "Please enter complete rating and review",
        });
    }

    const courseDetails = await Course.findById(courseId,{
        studentsEnrolled : {
            $elemMatch : {$eq: userId},
        }
    });

    if(!courseDetails){
        return res.status(400).json({
            success: false,
            message : "Not brought this course",
        });
    }

    const ratingDetails = await Rating.create({
        rating,
        review,
        course : courseId,
        user : userId,
    });

    const newCourse = await Course.findByIdAndUpdate(courseId,{
        $push:{
            ratingAndReviews : ratingDetails._id,
        }
    },{new:true});

    return res.status(200).json({
        success : true,
        message : "Course rating updated successfully",
        ratingDetails
    });
  }

    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message,
        });
    }
}


exports.getAllRating = async(req,res)=>{
    const {courseId}= req.body;

    // get all rating related to that particular course
    const allRating = await Course.findById(courseId).populate("RatingAndReviews").exec();

    if(!allRating) {
        return res.status(400).json({
            success: false,
            message: "No ratings found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Rating fetched successfully",
        allRating
    });
}


exports.getAverageRating = async(req,res)=>{
    try{
        const {courseId}= req.body;

        const result = await Rating.aggregate([
            {
                $match:{
                    course : new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id : null,
                    avgRating : {$avg : "$rating"},
                }
            }
        ])

        return res.status(200).json({
            success: true,
            message: "Avg rating fetched successfully",
            result,
        });


    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message,
        });
    }
}


exports.getAllRatingReview = async (req,res)=>{

    try{
    const allRating = await Rating.find({}).populate({
        path: "course",
        select: "courseName -_id" // Specify the fields you want to select and exclude the id
    }).populate({
        path : "user",
        select: "firstName lastName image email -_id" 
    }).exec();
    
    
    
    if(!allRating) {
        return res.status(400).json({
            success: false,
            message: "No ratings found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Rating fetched successfully",
        allRating
    });
  }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message,
    }); 
 }
}
