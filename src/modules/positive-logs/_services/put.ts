import { PositiveLogsModel } from "../model";
import { UserAccountModel } from "../../users/model";

export const putOneRecoveredService = async (
	id: any
): Promise<Boolean> => {

	const data = await PositiveLogsModel.findOneAndUpdate({ _id: id }, { healthStatus: "Recovered" }, { returnOriginal: false });
    const findAnyReport = await PositiveLogsModel.find({ mobileNumber: data.mobileNumber, healthStatus: "Positive" })
    
    if(findAnyReport.length === 0) {
        await UserAccountModel.findOneAndUpdate({ mobileNumber: data.mobileNumber }, { userHealthStatus: "Recovered" }, { returnOriginal: false });
    }
    
    return true;
};
