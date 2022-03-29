import Joi from "joi";

export const adminSchema = Joi.object({
	firstName: Joi.string().required(),
	middleName: Joi.string().allow("", null),
	lastName: Joi.string().required(),
	suffix: Joi.string().allow("", null),
	username: Joi.string().required(),
	locationAssigned: Joi.string().allow("", null),
	email: Joi.string().email().required(),
	role: Joi.string().required(),
});

export const adminPutSchema = Joi.object({
	firstName: Joi.string().required(),
	middleName: Joi.string().allow("", null),
	lastName: Joi.string().required(),
	suffix: Joi.string().allow("", null),
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	locationAssigned: Joi.string().allow("", null),
	role: Joi.string().required(),
});

export const adminIdArraySchema = Joi.array()
	.items(Joi.string())
	.min(1)
	.required();
