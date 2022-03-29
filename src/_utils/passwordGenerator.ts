import bcrypt from "bcryptjs";

export const generatePassword = async (): Promise<string | void> => {
	let password: string;

	if (process.env.NODE_ENV === "development") {
		password = "juanbreath_admin";
	} else {
		password = Math.random().toString(36);
	}

	return bcrypt
		.hash(password, 12)
		.then((res) => res)
		.catch((err) => console.error(err));
};
