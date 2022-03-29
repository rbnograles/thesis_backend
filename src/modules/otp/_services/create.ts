import { MobileOTPModel, IMobileOTPType } from "..//model";

export const createOneService = async (data: any): Promise<IMobileOTPType> => {
	if (await MobileOTPModel.findOne({ mobileNumber: data.mobileNumber })) {
		const result = await MobileOTPModel.findOneAndUpdate(
			{ mobileNumber: data.mobileNumber },
			data,
			{
				returnOriginal: false,
			}
		);

		return result;
	} else {
		const result = await MobileOTPModel.create(data);
		return result;
	}
};
