import { ExistingError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";
import { DiseaseModel, IDiseaseType, DiseaseTypeSchema } from "../models";

export const createOneService = async (
	data: DiseaseTypeSchema
): Promise<IDiseaseType> => {
	if (await isExistingInDatabase("name", data.name, DiseaseModel))
		throw ExistingError("Location");

	const result = await DiseaseModel.create(data);
	return result;
};

export const createManyService = async (
	data: Array<DiseaseTypeSchema>
): Promise<Array<IDiseaseType>> => {
	return await DiseaseModel.insertMany(data);
};
