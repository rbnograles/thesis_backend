import { LocationModel, ILocationType } from "../models";

export const getOneService = async (id: string): Promise<ILocationType> => {
	const result = await LocationModel.findById(id);
	return result;
};

export const getManyService = async (): Promise<Array<ILocationType>> => {
	return await LocationModel.find();
};
