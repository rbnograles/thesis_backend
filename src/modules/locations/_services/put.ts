import { LocationModel, ILocationType, LocationTypeSchema } from "../models";
import { NotFoundError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";

export const putOneService = async (
	id: string,
	data: LocationTypeSchema
): Promise<ILocationType> => {
	if (await isExistingInDatabase("_id", id, LocationModel, true)) {
		return await LocationModel.findOneAndUpdate({ _id: id }, data, {
			returnOriginal: false,
		});
	} else {
		throw NotFoundError("Assessment not found");
	}
};
