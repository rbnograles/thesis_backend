import { DiseaseModel, IDiseaseType, DiseaseTypeSchema } from "../models";
import { NotFoundError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";

export const putOneService = async (
	id: string,
	data: DiseaseTypeSchema
): Promise<IDiseaseType> => {
	if (await isExistingInDatabase("_id", id, DiseaseModel, true)) {
		return await DiseaseModel.findOneAndUpdate({ _id: id }, data, {
			returnOriginal: false,
		});
	} else {
		throw NotFoundError("Disease not found");
	}
};
