import { RoleModel, IRole } from "../model";

export const getOneService = async (id: string): Promise<IRole> => {
	const result = await RoleModel.findById(id);
	return result;
};

export const getManyService = async (): Promise<Array<IRole>> => {
	return await RoleModel.find().populate("permissions");
};
