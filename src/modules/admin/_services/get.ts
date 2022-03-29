import { AdminAccountModel, AdminSchema } from "../model";

export const getOneService = async (id: string): Promise<AdminSchema> => {
	const result = await AdminAccountModel.findById(id);
	return result;
};

export const getManyService = async (): Promise<Array<AdminSchema>> => {
	return await AdminAccountModel.find();
};
