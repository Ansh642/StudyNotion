import {toast} from 'react-toastify'
import axios from "axios";



function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(courses, userDetails, navigate) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await axios.post('/api/v1/payment/capturePayment',{
            courses
        });

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount );
                //verifyPayment
                verifyPayment({...response, courses},navigate); 
            }
        }
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("Oops, payment failed");
            console.log(response.error);
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await axios.post('/api/v1/payment/sendPaymentSuccessEmail', {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
       });
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}


//verify payment
async function verifyPayment(bodyData, navigate) {
    const toastId = toast.loading("Verifying Payment....");

    try{
        const response  = await axios.post('/api/v1/auth/payment/verifySignature',{
            bodyData,
        });

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, You are addded to the course");
        navigate("/dashboard/enrolled-courses");
        
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

