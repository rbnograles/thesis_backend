// models
import { PermissionModel } from "../model";

/**
 * Module Permission
 * Permission service
 *
 */
class PermissionService {
	constructor() {}

	async getAllPermissions() {
		try {
			// GETS All Permissions
			const permissions = await PermissionModel.find(
				{},
				{ name: 1, description: 1 }
			);

			if (permissions.length === 0)
				return {
					success: true,
					message: "No Permissions existing",
					code: 200,
				};

			return { success: true, data: permissions, code: 200 };
		} catch (error) {
			return {
				success: false,
				message: "Failed to GET All Permissions",
				deepLog: error,
				code: 400,
			};
		}
	}

	async getOnePermissions(_id: string) {
		// Check if Permission exist
		let isExisting = await PermissionModel.findById({ _id });
		// Return if Permission does not exist
		if (isExisting === null)
			return {
				success: false,
				message: "Permission does not exist",
				code: 400,
			};

		try {
			// GET Selected Permission
			let getPermission: any = await PermissionModel.findById(
				{ _id },
				{ name: 1, description: 1 }
			);

			return { success: true, data: getPermission, code: 200 };
		} catch (error) {
			return {
				success: false,
				message: "Failed to GET Permission",
				deepLog: error,
				code: 400,
			};
		}
	}
}

export default PermissionService;
