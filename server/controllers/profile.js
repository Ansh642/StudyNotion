const User=  require('../models/user');
const Profile = require('../models/profile');
const Course = require('../models/course');


//update profile
exports.updateProfile = async(req,res)=>{
  
    try{
      const {gender,dateOfBirth="",about="",contactNumber} = req.body;
      const id = req.user.id;
  
      const userDetails = await User.findById(id);    
      const profileId = userDetails.additionalDetails;
      const profileDetails = await Profile.findById(profileId);
  
      profileDetails.gender = gender;
      profileDetails.dateOfBirth = dateOfBirth;
      profileDetails.about = about;
      profileDetails.contactNumber = contactNumber;
  
      await profileDetails.save();
  
      return res.status(200).json({
        success : true,
        message:' Profile updated successfully',
        profileDetails,
    });
  
    }
    catch(err){
      return res.status(500).json({
        success: false,
        message:"An error occurred while updating profile information",
    });
  }
}


exports.deleteProfile = async(req,res)=>{
    try{
        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        if(!userDetails)
        {
            return res.status(500).json({
                success: false,
                message:"No such user exists",
            });
        }

        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId);

        // unenroll user from all courses
        const courseDetails = await Course.findByIdAndUpdate(userId,{
            $pull:{
                studentsEnrolled: userId,
            }
        });

        
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message:"User deleted successfully",
        });
    }   
    catch(err){
        return res.status(500).json({
            success: false,
            message:"An error occurred while deleting profile information",
        });
    } 
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;

		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();

		console.log(userDetails);
    
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id

      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      );

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true });

     //console.log(updatedProfile);

      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      });

    }
      catch (error) {
      return res.status(500).json({
        success: false,
        message: "error",
      })
    }
};
  
// get all enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({_id: userId}).populate("courses").exec()

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
