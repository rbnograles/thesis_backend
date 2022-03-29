import bcrypt from "bcryptjs";
import { ExistingError } from "../../../_utils/errors";
import { isExistingInDatabase } from "../../../_utils/isExistingDatabase";
import { AdminAccountModel, IAdminAccountType, AdminSchema } from "../model";
import nodemailer from "nodemailer";

export const createOneService = async (
	data: AdminSchema
): Promise<IAdminAccountType> => {
	if (
		await isExistingInDatabase("username", data.username, AdminAccountModel)
	)
		throw ExistingError("Administrator");
	// hashed the default password when creating new accounts
	data.password = bcrypt.hashSync("juanbreath_admin", 12);
	// set up nodemailer transporter
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: "ryannograles.025.official@gmail.com",
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.AUTH_REFRESH_TOKEN
		}
	})
	// testing transporter
	transporter.verify((err, success) => {
		if(err) {
			console.log(err)	
		} else {
			console.log("Ready for message")
			console.log(success);
		}
	});

	// add email sending logic
	const message = {
		to: data.email,
		from: "ryannograles.025.official@gmail.com",
		envelope : {
			from: "JuanBreath Admin <ryannograles.025.official@gmail.com>",
			to: data.email
		},
		subject: `Account and password setup`,
		html: `<p>Welcome ${data.username}, your password is Password: juanbreath_admin please change this as soon as you logged in.</p>`,
	};

	transporter
		.sendMail(message).then((res) => {
			console.log(res)
		}).catch((error) => {
			console.log(error)
		})

	const result = await AdminAccountModel.create(data);
	return result;
};

// @function createOneServiceSeed will not send email since this is just dummy accounts
// used only in development
export const createOneServiceSeed = async (
	data: AdminSchema
): Promise<IAdminAccountType> => {
	if (
		await isExistingInDatabase("username", data.username, AdminAccountModel)
	)
		throw ExistingError("Administrator");
	// hashed the default password when creating new accounts
	data.password = bcrypt.hashSync("juanbreath_admin", 12);

	const result = await AdminAccountModel.create(data);
	return result;
};

export const createManyService = async (
	data: Array<AdminSchema>
): Promise<Array<AdminSchema>> => {
	let accounts: AdminSchema[] = [];
	// loop through all entries so that the password will be encrypted

	for (let i = 0; i < data.length; i++) {
		data[i].password = bcrypt.hashSync(data[i].password, 12);
		accounts.push(data[i]);
	}
	return await AdminAccountModel.insertMany(accounts);
};
