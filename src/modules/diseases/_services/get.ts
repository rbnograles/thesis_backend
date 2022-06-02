import { DiseaseModel, IDiseaseType } from "../models";

export const getOneService = async (id: string): Promise<IDiseaseType> => {
	const result = await DiseaseModel.findById(id);
	return result;
};

export const getManyService = async (): Promise<Array<IDiseaseType>> => {
	return await DiseaseModel.find();
};

export const getManyServiceFiltered = async () => {
	const data = await DiseaseModel.find();
	const newLoc = [];

	for(let i = 0; i < data.length; i++) {
		newLoc.push({ label: data[i].name, name: data[i].name})
	}
	return newLoc
};
