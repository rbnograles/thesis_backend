import { NotificationModel } from "../model";
import { UserAccountModel } from "../../users/model";

export const getOneService = async (id: string) => {
	const userAccount = await UserAccountModel.findById(id)
	const result = await NotificationModel.find({ mobileNumber: userAccount.mobileNumber });
	return result;
};

export const getCountService = async (id: string) => {
	const userAccount = await UserAccountModel.findById(id)
	const result = await NotificationModel.find({ mobileNumber: userAccount.mobileNumber });
	const count = result.filter((data) => { return data.new === true })

	return count.length;
};

