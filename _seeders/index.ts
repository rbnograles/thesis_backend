import dotenv from "dotenv";
// database connection config
import { connectToDatabase } from "../src/_utils/dbConnect";
import { UserSeed } from "./users";

dotenv.config();

export async function seedAccounts(): Promise<void> {
	await UserSeed(6);
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
				await seedAccounts();
			}

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
