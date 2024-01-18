const mongoose = require('mongoose');
const { mailsend } = require('../utils/mailsend');
const emailTemplate = require('../templates/emailVerificationTemplate');
 
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 6000 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});
 

//function to send mail
async function sendVerificationEmail(email, otp) {
	
	try {
		const mailResponse = await mailsend(
			email,
			"Verification Email",
			emailTemplate(otp),
		);
		console.log("Email sent successfully: ");
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}


// Define a post-save hook to send email after the document has been saved only for signup functionality
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model('OTP',OTPSchema);

