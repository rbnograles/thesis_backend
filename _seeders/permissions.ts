import { PermissionModel } from "../src/modules/permissions/index";

const modules = [
	"Admin",
	"Location",
	"Permissions",
	"Auth",
	"Role",
	"Contact-Tracing-Logs",
	"Dashboard",
	"Admin-Application-Download",
	"Visitation-History",
	"Users",
	"Statistics"
];

const actions = ["Read", "Create", "Update", "Delete"];

const permissions: Array<Object> = [];

function capitalize(str: string) {
	return `${[str.split("")[0].toUpperCase(), str.slice(1)].join("")}`;
}

export const PermissionSeed = async () => {
	for (let mod of modules) {
		for (let action of actions) {
			let access =
				action === "Read"
					? "view"
					: action === "Update"
					? "modify"
					: action === "Delete"
					? "remove"
					: "create";
			let description;

			if (mod === "Employee" || mod === "Admin") {
				// Accounts go here
				description =
					access === "view"
						? `Access to ${access} ${mod.toLowerCase()} data and accounts in the Account Manager`
						: `${capitalize(
								access
						  )} ${mod.toLocaleLowerCase()} data and accounts in the Account Manager`;
			} else if (mod === "Auth") {
				// Auth items go here
				description =
					access === "view"
						? `Access to Roles Panel in the Account Manager settings`
						: `${capitalize(
								access
						  )} items in the Roles panel of the Account Manager settings`;
			} else if(mod === "Statistics") {
				// Auth items go here
				description =
					access === "view"
						? `Access to Roles Panel in the Dashboard Statistics`
						: `${capitalize(
								access
						  )} items in the Roles panel of the Dashboard Statistics`;
			} 
			else {
				// Rest of items that are in the Configurations go here.
				if (access === "view") {
					description = `Access to view ${
						mod === "Enrollment"
							? `${mod.toLowerCase()} periods`
							: `${mod.toLowerCase()} items`
					} in the Configuration page`;
				} else {
					description = `${capitalize(access)} ${
						mod === "Enrollment"
							? `${mod.toLowerCase()} periods`
							: `${mod.toLowerCase()} items`
					} in the Configuration page`;
				}
			}

			const newPermission = new PermissionModel({
				name: `${mod}:${action}`,
				description,
			});

			permissions.push(newPermission);
		}
	}
	await PermissionModel.insertMany(permissions);
	console.log("Permissions seeded.");
};
