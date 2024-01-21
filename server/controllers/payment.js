// Here instance is a function
const {instance}= require('../config/razorpay');
const User = require('../models/user');
const Course = require('../models/course');
const mailsend = require('../utils/mailsend');
const {courseEnrollmentEmail} = require('../templates/courseEnrollmentEmail');
const { default: mongoose } = require("mongoose")


exports.capturePayment =async(req,res)=>{
  
  const {courseId}=req.body;
  const studentId = req.user.id;

  if(!courseId)
  {
    return res.json({
      success: false,
      message: 'Please enter valid course id',
    });
  }

  let course;

  try{
    course = Course.findById(courseId);
    if(!course)
    {
      return res.json({
        success: false,
        message: 'No such course found',
      });
    }

    // check if user is already enrolled,
    // convert string id to object id, 

    const uid= new mongoose.Types.ObjectId(studentId);

    if(course.studentsEnrolled.includes(uid))
    {
      return res.json({
        success: false,
        message: 'student is already enrolled',
      });
    }

  }
  catch(err){
    return res.status(500).json({
      success : false,
      message:'error while buying course',
  });
  
}

  // validation done now create the order
  // create opions
  var options = {
    amount: Course.price *100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
    notes:{
      courseId,
      studentId,
    }
  };

  try
  {
    const paymentResponse = instance.orders.create(options);
    console.log(paymentResponse);

    return res.status(200).json({
      success: true,
      message : "Order created successfully ",
      courseName : course.courseName,
      orderId : paymentResponse._id,
      currency : paymentResponse.currency,
      amount : paymentResponse.amount,
    });
  }

  catch(err)
  {
    return res.status(500).json({
      success : false,
      message:'error in payment request',
  });
  }

}

exports.verifySignature =async(req,res)=>{

  const webhooksecret="12345678";
  // signature received from razorpay 
  const signature = req.headers["x-razorpay-signature"];
 
  // 3 steps to convert webhook secret into signature(that razorpay has return) and later verify it,

  const shasum=crypto.createHmac("SHA256", webhooksecret);
  shasum.update(JSON.stringyfy(req,body));
  const digest = shasum.digest("hex");

  if(digest===signature)
  {
    console.log("Payment is authenticated");

    // now take some action
    const {courseId,studentId}=  req.body.payload.payment.entity.notes;

    try
    {
      // find the course and enroll the student
      const course = await Course.findOneAndUpdate(courseId,{
        $push:{
          studentsEnrolled : studentId,
        }
      },{new:true});

      // find the student and add the particular course to course section of that student

      const student = await User.findOneAndUpdate(studentId,{
      $push:{
        courses: courseId,
      }
      },{new:true});

      // send mail to the student for buying course
      await mailsend(student.email,"CodeHelp","Congratulations on buying a new course");
      console.log(mailsend);

      return res.status(200).json({
        success: true,
        message: 'Payment successful and course brought successfully',
      });

    }
    catch(err)
    {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  else
  {
    return res.status(400).json({
      success: false,
      message: 'Invalid request',
    });
  }


}




