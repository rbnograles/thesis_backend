import { UserAccountModel } from "../src/modules/users/model";

export const UserSeed = async (): Promise<void> => {
	const numbers = [];

	for (let i = 0; i < numbers.length; i++) {
		// use the create one controller
		await UserAccountModel.create({
            mobileNumber: numbers[i],
            createdAt: "2022-06-07T00:08:39.694+00:00",
            isVerified: true
        })
	}
};
