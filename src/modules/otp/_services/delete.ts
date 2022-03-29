import { MobileOTPModel } from "../model";

export const deleteOneService = async (data: any) => {
	const result = await MobileOTPModel.deleteMany({
		mobileNumber: data.mobileNumber,
	});
};
