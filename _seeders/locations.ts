import faker from "faker";
import { createOneService } from "../src/modules/locations/_services/create";

export const LocationSeed = async (numberToSeed: number): Promise<void> => {
	// Create [numberToSeed] accounts
	for (let i = 0; i < numberToSeed; i++) {
		const name =
			faker.address.cityName() + " " + faker.address.streetName();
		const address = faker.address.streetAddress();
		const officerInCharge =
			faker.name.firstName() + " " + faker.name.lastName();

		await createOneService({
			name,
			address,
			officerInCharge,
		});
	}
};
