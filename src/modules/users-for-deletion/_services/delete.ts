import { LocationModel } from "../models";

export const deleteOneService = async (
	idToDelete: string
): Promise<boolean> => {
	await LocationModel.findByIdAndDelete(idToDelete);
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
