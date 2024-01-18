const Section = require('../models/section');
const Subsection = require('../models/SubSection');
const {uploadImageToCloudinary} = require('../utils/imageUpload');

require("dotenv").config();
 
exports.createSubSection= async(req,res)=>{
    try
    {

        const {sectionId, title, timeDuration,description} = req.body;
        const videoUrl = req.files.videoUrl;


        if(!sectionId || !title || !timeDuration || !description || !videoUrl){
            return res.status(400).json({
                success: false,
                message: 'Please enter complete details',
            });
        }

        const uploadVideo = await uploadImageToCloudinary(videoUrl,process.env.FOLDER_NAME);
        
       

        // create sub section
        const subSectionDetails = await Subsection.create({
            title, timeDuration, description, videoUrl : uploadVideo.secure_url,
        });

        // update section
        const updatedSection = await Section.findByIdAndUpdate({ _id:sectionId},{
            $push:{
                subSection : subSectionDetails._id,
            }
        },{new: true});

        return res.status(200).json({
            success : true,
            message:'Sub-Section created successfully',
            subSectionDetails,
        });
    }

    catch(err){
        return res.status(500).json({
            success : false,
            message:'error while creating Subsection',
        });
    }
}


exports.updateSubSection = async(req,res)=>{

    const {subSectionId,title,description,timeDuration}=req.body;
    const videoUrl = req.files.videoUrl;

    if( !subSectionId || !title || !timeDuration || !description || !videoUrl){
        return res.status(400).json({
            success: false,
            message: 'Please enter complete details',
        });
    }

    const uploadVideo = await uploadImage(videoUrl,process.env.FOLDER_NAME);

    const updatedSubSection = await Subsection.findByIdAndUpdate(subSectionId,{
        title: title,
        description: description,
        videoUrl: uploadVideo.secure_url,
        timeDuration : timeDuration,
    });

    return res.status(200).json({
        success : true,
        message:'Section created successfully',
    });
}

exports.deleteSubSection= async(req,res)=>{

    try{
        const {subSectionId}=req.body;

        const subSection = await Subsection.findByIdAndDelete(subSectionId);
    
        return res.status(200).json({
            success : true,
            message:'Sub-Section deleted successfully',
        });
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message: err.message
        });
    }
}


