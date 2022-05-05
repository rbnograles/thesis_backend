import { NotificationModel, INotification } from "../model";

export const getOneService = async (id: string): Promise<INotification> => {
	const result = await NotificationModel.findById(id);
	return result;
};

