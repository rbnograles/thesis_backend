import dotenv from "dotenv";

import { AdminSeed } from "./admin";
import { LocationSeed } from "./locations";
import { PermissionSeed } from "./permissions";
import { SuperAdminRoleSeed } from "./role";
import { AdminAccountModel } from "../src/modules/admin/model";
import { LocationModel } from "../src/modules/locations/models";
import { PermissionModel } from "../src/modules/permissions/model";
import { RoleModel } from "../src/modules/roles/model";
import { UserSeed } from "./users";
// database connection config
import { connectToDatabase } from "../src/_utils/dbConnect";

dotenv.config();

export async function clearAccounts(): Promise<void> {
	console.log("Clearing the authentication related data...\t");
	console.log("Deleting administrator collection...");
	await AdminAccountModel.deleteMany({});
	console.log("Deleting administrator collection...");
	await LocationModel.deleteMany({});
	console.log("Deleting permission collection...");
	await PermissionModel.deleteMany({});
	console.log("Deleting role collection...");
	await RoleModel.deleteMany({});
}

export async function seedAccounts(): Promise<void> {
	console.log("Seeding permissions related information...");
	await PermissionSeed();
	console.log("Seeding roles related information...");
	await SuperAdminRoleSeed();
	console.log("Seeding account related information...");
	await AdminSeed(10);
}

export async function seedLocations(): Promise<void> {
	console.log("Seeding the locations related information...");
	await LocationSeed(10);
}

/**
 * The main entry point of the seeder engine.
 * @param safe Are you seeding on an already seeded database?
 */
export async function seed(safe: boolean): Promise<void> {
	try {
		if (await connectToDatabase()) {
			// If the safe flag is disabled, we're deleting all data.
			if (!safe) {
				console.log(
					"IMPORTANT: You have seeded using the `yarn seed` option, this means that we're deleting all authentication data \n" +
						"and you need to reassign references related to the Accounts again. \n\n"
				);

				await clearAccounts();
				await seedAccounts();
				await seedLocations();
			}

			await UserSeed();

			console.log("\n\nSeeding successful!");
		} else {
			console.log(
				"Seeding unsuccessful. Failed to connect to the database. [ERROR_DB_CONNECTION]"
			);
		}

		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}
