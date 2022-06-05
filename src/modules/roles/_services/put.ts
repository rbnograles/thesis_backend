import { RoleModel, IRole } from "../model";
import { NotFoundError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";

export const putOneService = async (
	id: string,
	data: IRole
): Promise<IRole> => {
	if (await isExistingInDatabase("_id", id, RoleModel, true)) {
		return await RoleModel.findOneAndUpdate({ _id: id }, data, {
			returnOriginal: false,
		}).populate("permissions");
	} else {
		throw NotFoundError("Assessment not found");
	}
};
