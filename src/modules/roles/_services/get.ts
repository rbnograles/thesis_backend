import { RoleModel, IRole } from "../model";

export const getOneService = async (id: string): Promise<IRole> => {
	const result = await RoleModel.findById(id);
	return result;
};

export const getOneRoleExclusiveService = async (roleName: string): Promise<Array<IRole>> => {
	const result = await RoleModel.find({ name: roleName }).populate("permissions");
	return result;
};

export const getManyService = async (): Promise<Array<IRole>> => {
	return await RoleModel.find().populate("permissions");
};
