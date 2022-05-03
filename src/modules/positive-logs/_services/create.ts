import { IPositiveLogsType, PositiveLogsModel } from "../model";
import { UserAccountModel } from "../../users/model";

export const createOneService = async (
	data: any
): Promise<IPositiveLogsType> => {
	const result = await PositiveLogsModel.create(data);
	await UserAccountModel.findOneAndUpdate({ mobileNumber: data.mobileNumber }, { userHealthStatus: "Positive" }, { returnOriginal: false });
	return result;
};
