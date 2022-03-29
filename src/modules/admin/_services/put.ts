import { AdminAccountModel, AdminSchema } from "../model";
import { NotFoundError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";

export const putOneService = async (
	id: string,
	data: AdminSchema
): Promise<AdminSchema> => {
	if (await isExistingInDatabase("_id", id, AdminAccountModel, true)) {
		const currentAccount = await AdminAccountModel.findById(id);
		// saved the current password
		const newAccount = {
			...data,
			_id: currentAccount._id,
			password: currentAccount.password,
		};
		// update the current data
		return await AdminAccountModel.findOneAndUpdate(
			{ _id: id },
			newAccount,
			{
				returnOriginal: false,
			}
		);
	} else {
		throw NotFoundError("Admin account not found");
	}
};
