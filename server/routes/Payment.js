// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment,verifySignature} = require("../controllers/payment");
const { auth, isStudent } = require("../middlewares/middleware");

router.post("/capturePayment", function(req,res){
    auth, isStudent, capturePayment
});

router.post("/verifySignature", verifySignature)

module.exports = router;



