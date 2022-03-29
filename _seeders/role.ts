import { PermissionModel } from "../src/modules/permissions";
import { RoleModel } from "../src/modules/roles/model";

export const SuperAdminRoleSeed = async (): Promise<void> => {
	const permissionId: string[] = [];
	// get the permissions details
	const permissions = await PermissionModel.find({});
	// loop through all permissions
	for (let i in permissions) {
		permissionId.push(permissions[i]._id);
	}
	await RoleModel.create({
		name: "superadmin",
		description:
			"This is the highest role level, it allows the admin to view all functions of the system.",
		permissions: permissionId,
	});
};
