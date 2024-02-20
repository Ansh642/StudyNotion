// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {createCourse,
    getAllCourses,
    getCourseDetails,
    studentCourses} = require("../controllers/course")

// Categories Controllers Import
const { showAllCategories,
    createCategory,
    categoryPageDetails,} = require("../controllers/category")

// Sections Controllers Import
const {createSection,
    updateSection,
    deleteSection} = require("../controllers/section")

// Sub-Sections Controllers Import
const {createSubSection,
    updateSubSection,
    deleteSubSection} = require("../controllers/subsection");

// Rating Controllers Import
const {createRating,
    getAverageRating,
    getAllRatingReview
} = require("../controllers/rating")

// Importing Middlewares
const { auth, 
    isInstructor, 
    isStudent,
    isAdmin } = require("../middlewares/middleware");

// Courses can Only be Created by Instructors
router.post("/createCourse", 
    auth, isInstructor, createCourse);

//Add a Section to a Course
router.post("/addSection",
    auth,
    isInstructor,
    createSection);


// Update a Section
router.post("/updateSection", function(req,res){
    auth, isInstructor, updateSection
});


// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);


// Edit Sub Section
router.post("/updateSubSection", (req,res)=>{
    auth, isInstructor, updateSubSection
} )


// Delete Sub Section
router.post("/deleteSubSection", (req,res)=>{
    auth, isInstructor, deleteSubSection
} );


// Add a Sub Section to a Section
router.post("/addSubSection",auth, isInstructor, createSubSection);


// Get all Registered Courses
router.post("/getAllCourses", getAllCourses);

// Get all Registered Courses of a student
router.get("/getAllStudentCourses",auth, studentCourses);


// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

router.post("/createCategory" , 
    auth, isAdmin, createCategory);

router.get("/showAllCategories", showAllCategories);

router.post("/getCategoryPageDetails", categoryPageDetails);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating", function(req,res){
    auth, isStudent, createRating
} );

router.get("/getAverageRating", getAverageRating);

router.get("/getReviews", getAllRatingReview);


module.exports = router;

