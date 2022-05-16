import { UserDeletionModel, IUserDeletionType, UserForDeletionSchema } from "../model";

export const createOneService = async (
	data: UserForDeletionSchema
): Promise<IUserDeletionType> => {
	console.log(await UserDeletionModel.findOne({ "mobileNumber": data.mobileNumber }))
	if (!await UserDeletionModel.findOne({ "mobileNumber": data.mobileNumber })) {
		console.log('passing')
		const result = await UserDeletionModel.create(data);
		return result;
	} else {
		const result = await UserDeletionModel.findOneAndUpdate({ mobileNumber: data.mobileNumber }, data, { returnOriginal: false });
		return result;
	}
};

