import { RequestHandler } from "express";
// user credential model
import { LoginSchema } from "../schema";
import { AdminAccountModel } from "../../admin/model";
// utilities
import bcrypt from "bcryptjs";
import { generateToken } from "../../../_utils/tokenGenerator";
import { validateRequestSchema } from "../../../_utils/requestValidatorConfig";
import { AuthenticationError } from "../../../_utils/errors";

type LoginSchemaType = {
	username: string;
	password: string;
};

export const validateCredentials: RequestHandler = async (req, res, next) => {
	try {
		validateRequestSchema(LoginSchema, req.body);

		const { username } = req.body as LoginSchemaType;
		AdminAccountModel.findOne({ username })
			.then(async (user) => {
				if (user) {
					const match = await bcrypt.compare(
						req.body.password,
						user.password
					);
					if (!match) throw AuthenticationError("Wrong password.");
					next();
				} else {
					throw AuthenticationError(
						"There is no registered user that matches your credentials."
					);
				}
			})
			.catch(next);
	} catch (error) {
		next(error);
	}
};

// @function, handles user login and assigning of generated login tokens
export const loginController: RequestHandler = async (req, res, next) => {
	AdminAccountModel.findOne({
		username: req.body.username,
	}).then((user) => {
		const tokenizedObj = {
			_id: user._id,
			firstName: user.firstName,
			middleName: user.middleName,
			lastName: user.lastName,
			username: user.username,
			role: user.role,
		};
		// after successfully finding the users credential generate the tokens
		const accessToken = generateToken(
			tokenizedObj,
			req.body.role,
			"accessToken"
		);
		const refreshToken = generateToken(
			tokenizedObj,
			req.body.role,
			"refreshToken"
		);
		res.status(200).json({ success: true, accessToken, refreshToken });
	});
};
