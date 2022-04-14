import { RequestHandler } from "express";
import { AdminAccountModel } from "../../admin/model";
import nodemailer from "nodemailer";
// utilities
import bcrypt from "bcryptjs";

// if yes send email and reset password to some random password
// if no send a response for no registered email

export const forgotPasswordController: RequestHandler = async (req, res, next) => {

    let password: string;
    
    password = Math.random().toString(36);

    const resetedPassword = bcrypt.hashSync(password, 12);
    // set up nodemailer transporter
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: "juanbreath.official@gmail.com",
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.AUTH_REFRESH_TOKEN
		}
	})
	// testing transporter
	transporter.verify((err, success) => {
		if(err) {
			console.log(err)	
		} else {
			console.log("Ready for message")
			console.log(success);
		}
	});

	// add email sending logic
	const message = {
		to: req.body.email,
		from: "JuanBreath Admin <juanbreath.official@gmail.com>",
		envelope : {
			from: "JuanBreath Admin <juanbreath.official@gmail.com>",
			to: req.body.email
		},
		subject: `Forgot Password Request`,
		html: `<p>Greetings, a password reset request has been sent to the system. An auto generated password is created for your ease.</p><p>Your new password is <b>${password}</b>, change this upon logging in to the system.</p><p>Please feel free to respond to this email. It was sent from a monitored email address, and we would love to hear from you.</p>`,
	};

	transporter
		.sendMail(message).then((res) => {
			console.log(res)
		}).catch((error) => {
			console.log(error)
		})

	await AdminAccountModel.findOneAndUpdate({ email: req.body.email }, { password: resetedPassword }, {returnOriginal: false});
	
    return res.status(200).json({ success: true})
};
