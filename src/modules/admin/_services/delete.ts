import { AdminAccountModel } from "../model";

export const deleteOneService = async (
	idToDelete: string
): Promise<boolean> => {
	await AdminAccountModel.findByIdAndDelete(idToDelete);
	return true;
};

export const deleteManyService = async (
	idsToBeDeleted: Array<string>
): Promise<boolean> => {
	for (let i = 0; i < idsToBeDeleted.length; i++) {
		deleteOneService(idsToBeDeleted[i]);
	}

	return true;
};
