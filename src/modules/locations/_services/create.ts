import { ExistingError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";
import { LocationModel, ILocationType, LocationTypeSchema } from "../models";

export const createOneService = async (
	data: LocationTypeSchema
): Promise<ILocationType> => {
	if (await isExistingInDatabase("name", data.name, LocationModel))
		throw ExistingError("Location");

	const result = await LocationModel.create(data);
	return result;
};

export const createManyService = async (
	data: Array<LocationTypeSchema>
): Promise<Array<ILocationType>> => {
	return await LocationModel.insertMany(data);
};
