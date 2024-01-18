const nodemailer= require('nodemailer');
require("dotenv").config();

exports.mailsend = async(email,title,body)=>{
    try{
      const transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          secure: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        });

          
      let info = await transporter.sendMail({
        from: "StudyNotion",
        to:  `${email}`,
        subject: `${title}`,
        html: `${body}`,
      });

      console.log(info);
    }
 
    catch(err){
      console.log(err.message);
    }
}
