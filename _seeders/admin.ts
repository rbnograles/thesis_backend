import faker, { fake } from "faker";
import { createOneServiceSeed } from "../src/modules/admin/_services/create";

export const AdminSeed = async (numberToSeed: number): Promise<void> => {
	// Create [numberToSeed] accounts
	for (let i = 0; i < numberToSeed; i++) {
		const firstName = faker.name.firstName();
		const middleName = faker.name.middleName();
		const lastName = faker.name.lastName();
		const suffix = faker.name.suffix();
		const locationAssigned = faker.address.streetName();
		const email = faker.internet.email(firstName, lastName);
		// use the create one controller
		await createOneServiceSeed({
			firstName,
			middleName,
			lastName,
			suffix,
			locationAssigned,
			email,
			username: faker.internet.userName(firstName),
			password: "juanbreath_admin",
			role: "superadmin",
		});
	}
};
