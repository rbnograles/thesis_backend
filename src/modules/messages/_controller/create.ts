import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import { generateOTPCode } from "../../../_utils/otpGenerator";
import { createOneService } from "../../otp/_services/create";
import { verifyOneService } from "../../otp/_services/verify";
import { NotificationModel } from "../../notifications/model";

export const createOneController: RequestHandler = async (req, res, next) => {
	try {
		// create otp verification api

		// twilio credentials for otp
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		const client = require("twilio")(accountSid, authToken);

		// const systemNumber = "+19377213296";
		const systemNumber = "+17372347216";
		// get the users mobile number
		const clientNumber = `+63${req.body.mobileNumber}`;
		// generate 4 ramdom otp code
		const otp = generateOTPCode();
		const hashedOTP = await bcrypt.hash(otp.toString(), 12);
		// save the number to database with random otp code and expiration, verified:boolean
		createOneService({ mobileNumber: clientNumber, otpCode: hashedOTP });

		client.messages
			.create({
				body: `Your OTP Verification Code is ${otp}. This will expire in 2 minutes. Do not share this with anyone.`,
				from: systemNumber,
				to: clientNumber,
			})
			.then((message) =>
				res
					.status(200)
					.json({ success: true, otp: otp, message: message })
			)
			.catch((err) => {
				console.log(err)
				res.status(200).json({ success: false, message: err })	
			});
	} catch (err) {
		next(err);
	}
};

export const verifyOneController: RequestHandler = async (req, res, next) => {
	try {
		// get the users mobile number
		const clientNumber = `${req.body.mobileNumber}`;
		// generate 4 ramdom otp code
		const otpCode = req.body.otpCode;
		// save the number to database with random otp code and expiration, verified:boolean
		const verificationStatus = await verifyOneService({
			mobileNumber: clientNumber,
			otpCode: otpCode,
		});

		// runs if the otp sent is invalid
		if (
			verificationStatus.result === null &&
			!verificationStatus.isValidOTP
		) {
			return res.status(400).json({
				success: false,
				message: "Invalid OTP Code, please request again.",
			});
		}

		// if (verificationStatus.isExpired) {
		// 	// users otp in now expired
		// 	await deleteOneService({ mobileNumber: clientNumber });
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "OTP Code has expired. Please request again.",
		// 	});
		// }
		const time = new Date().toLocaleTimeString().split(':');
		await NotificationModel.create({
			new: true, 
			time: `${time[0]}:${time[1]}`, 
			mobileNumber: clientNumber,
			description: "Welcome to JuanBreath Contact Tracing Application! We are happy to have you use our system. This system is a requirement for our thesis completion. Rest assured that all your personal information are used for educational purposes only.", 
			title: "Congratulations!"
		 })

		return res.status(200).json({
			success: true,
			message: "Verification Completed",
			result: verificationStatus,
		});
	} catch (err) {
		next(err);
	}
};
