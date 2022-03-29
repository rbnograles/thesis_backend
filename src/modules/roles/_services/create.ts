import { ExistingError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";
import { RoleModel, IRole } from "../model";

export const createOneService = async (data: IRole): Promise<IRole> => {
	if (await isExistingInDatabase("name", data.name, RoleModel))
		throw ExistingError("Role");

	const result = await RoleModel.create(data);
	return result;
};

export const createManyService = async (
	data: Array<IRole>
): Promise<Array<IRole>> => {
	let accounts: IRole[] = [];
	// loop through all entries so that the password will be encrypted
	return await RoleModel.insertMany(accounts);
};
