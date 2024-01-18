const express = require("express");
const app = express();

require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const cloudinary = require("./config/cloudinary");

// Routes 
const userRoute = require("./routes/User");
const paymentRoute = require("./routes/Payment");
const profileRoute = require("./routes/Profile");
const courseRoute = require("./routes/Course");

database.connect();
cloudinary.cloudinaryConnect();

const PORT= process.env.PORT || 4000;

// middleware 
app.use(express.json());
app.use(cookieParser());

// connecting frontend and backend
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials : true,
    })
);

// middleware for file upload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// call the routes
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/payment" ,paymentRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/course",courseRoute );

app.use("/",(req, res)=>{
    return res.json({
        success: true,
        message: "Server is running...",   
    });
});


app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
});


