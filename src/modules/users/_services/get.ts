import { UserSchema, UserAccountModel } from "../model";

export const getOneService = async (id: string): Promise<UserSchema> => {
	const result = await UserAccountModel.findById(id);
	return result;
};

export const getManyService = async (): Promise<Array<UserSchema>> => {
	return await UserAccountModel.find();
};
