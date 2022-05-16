import { ExistingError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";
import { UserDeletionModel, IUserDeletionType, UserForDeletionSchema } from "../model";

export const createOneService = async (
	data: UserForDeletionSchema
): Promise<IUserDeletionType> => {
	if (await isExistingInDatabase("name", data.mobileNumber, UserDeletionModel, true)) {
		const result = await UserDeletionModel.create(data);
		return result;
	} else {
		const result = await UserDeletionModel.findOneAndUpdate({ mobileNumber: data.mobileNumber }, data, { returnOriginal: false });
		return result;
	}
};

