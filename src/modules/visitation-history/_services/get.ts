import { IVisitationLogs, VisitationHistoryModel } from "../model";

export const getOneService = async (id: string): Promise<IVisitationLogs> => {
	const result = await VisitationHistoryModel.findById(id);
	return result;
};

export const getManyService = async (): Promise<Array<IVisitationLogs>> => {
	return await VisitationHistoryModel.find().populate("userId");
};
