import { NotificationModel, INotification } from "../model";

export const getOneService = async (id: string) => {
	const result = await NotificationModel.find();
	return result;
};

