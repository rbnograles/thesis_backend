import { LocationModel, ILocationType } from "../models";

export const getOneService = async (id: string): Promise<ILocationType> => {
	const result = await LocationModel.findById(id);
	return result;
};

export const getManyService = async (): Promise<Array<ILocationType>> => {
	return await LocationModel.find();
};

export const getManyServiceFiltered = async () => {
	const data = await LocationModel.find();
	const newLoc = [];

	for(let i = 0; i < data.length; i++) {
		newLoc.push({ label: data[i].name, name: data[i].name})
	}
	return newLoc
};
