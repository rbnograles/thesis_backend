import { PositiveLogsModel } from "../model";
import { UserAccountModel } from "../../users/model";

export const putOneRecoveredService = async (
	data: any
): Promise<Boolean> => {
	await PositiveLogsModel.findOneAndUpdate({ mobileNumber: data.mobileNumber }, { healthStatus: "Recovered" }, { returnOriginal: false });
    await UserAccountModel.findOneAndUpdate({ mobileNumber: data.mobileNumber }, { userHealthStatus: "Recovered" }, { returnOriginal: false });
    return true;
};
