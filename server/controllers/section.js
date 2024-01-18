const Section = require('../models/section');
const Course = require('../models/course');


exports.createSection = async(req,res)=>{

    // fetch details and update course
    const {sectionName , courseId} = req.body;

    if(!sectionName || !courseId){
        return res.status(400).json({
            success: false,
            message : 'Please enter complete details',
        });        
    }

    const newSection = await Section.create({sectionName});

    const updatedCourse = await Course.findByIdAndUpdate(courseId,{
        $push:{
            courseContent : newSection._id,
        }
    },{new: true});

    return res.status(200).json({
        success : true,
        message:'Section created successfully',
        newSection,
    });

}

exports.updateSection= async(req,res)=>{

    try{ 
    const {sectionName, sectionId} = req.body;

    if(!sectionName || !sectionId){
        return res.status(400).json({
            success: false,
            message : 'Please enter complete details',
        });        
    }

    const section =await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

    return res.status(200).json({
        success : true,
        message:'Section updated successfully',
    });
  }

    catch(err){
        return res.status(500).json({
            success : false,
            message:'error while updating section',
        });
    }
}

exports.deleteSection=async(req,res)=>{
    try{
    const {sectionId}=req.body;

    const section = await Section.findByIdAndDelete(sectionId);

    const updatedCourse = await Course.findByIdAndDelete(sectionId);

    return res.status(200).json({
        success : true,
        message: "Section deleted successfully",
        section,
    });
  }
    catch(err){
        return res.status(500).json({
            success : false,
            message: err.message
        });
    }
}




