// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment,verifySignature, sendPaymentSuccessEmail} = require("../controllers/payment");
const { auth, isStudent } = require("../middlewares/middleware");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature",auth,isStudent, verifySignature);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;



