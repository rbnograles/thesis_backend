import bcrypt from "bcryptjs";
import { MobileOTPModel } from "../model";
import { UserAccountModel } from "../../users/model";

export const verifyOneService = async (data: any) => {
	const result = await MobileOTPModel.findOne({
		mobileNumber: data.mobileNumber,
	});

	let userInfo = {};

	if (result !== null) {
		// check if the otp pass is valid from the hashed otp in the database
		const isValidOTP = await bcrypt.compare(data.otpCode, result.otpCode);
		// checking if the otp matches
		if (!isValidOTP) {
			return { isValidOTP: false, result: null };
		}

		// if (result.expiresAt < Date.now()) {
		// 	return { isExpired: true };
		// }

		if(await UserAccountModel.findOne({ mobileNumber: data.mobileNumber })) {
			// if the otp is valid, create a new user account for the user
			userInfo = await UserAccountModel.findOne({ mobileNumber: data.mobileNumber });
		} else {
			// if the otp is valid, create a new user account for the user
			userInfo = await UserAccountModel.create({
				mobileNumber: data.mobileNumber,
				isVerified: true,
			});
		}

		
		// delete the data from the mobile registration
		await MobileOTPModel.deleteOne({
			_id: result._id,
		});
	} else {
		return { isValidOTP: false, result: null };
	}

	return { result: userInfo, isValidOTP: true };
};
