import { IPositiveLogsType, PositiveLogsModel } from "../model";

export const createOneService = async (
	data: any
): Promise<IPositiveLogsType> => {
	const result = await PositiveLogsModel.create(data);
	return result;
};
