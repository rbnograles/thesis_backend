import Joi from "joi";

export const LoginSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

export const ResetPasswordSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	newPassword: Joi.string().required(),
	confirmNewPassword: Joi.string().required(),
});
