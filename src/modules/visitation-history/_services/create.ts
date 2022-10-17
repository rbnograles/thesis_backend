import { IVisitationLogs, VisitationHistoryModel } from "../model";

export const createOneService = async (
	data: IVisitationLogs
): Promise<IVisitationLogs> => {
	const result = await VisitationHistoryModel.create(data);
	return result;
};
