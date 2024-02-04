const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/middleware");

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************


// Delete User Account
router.delete("/deleteProfile", auth, deleteAccount);

router.put("/updateProfile", auth, updateProfile);

router.get("/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Courses
router.get("/getEnrolledCourses",  auth, getEnrolledCourses);

router.put("/updateDisplayPicture", auth, updateDisplayPicture );


module.exports = router;



