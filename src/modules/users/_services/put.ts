import { UserSchema, UserAccountModel } from "../model";
import { NotFoundError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";

export const putOneService = async (
	id: string,
	data: UserSchema
): Promise<UserSchema> => {
	if (await isExistingInDatabase("_id", id, UserAccountModel, true)) {
		const currentAccount = await UserAccountModel.findById(id);
		// update the current data
		return await UserAccountModel.findOneAndUpdate({ _id: id }, data, {
			returnOriginal: false,
		});
	} else {
		throw NotFoundError("Admin account not found");
	}
};

export const putOneUserTypeService = async (
	id: string,
	data: any
): Promise<UserSchema> => {
	if (await isExistingInDatabase("_id", id, UserAccountModel, true)) {
		const currentAccount = await UserAccountModel.findById(id);
		// update the current data
		return await UserAccountModel.findOneAndUpdate({ _id: id }, data, {
			returnOriginal: false,
		});
	} else {
		throw NotFoundError("User account not found");
	}
};
