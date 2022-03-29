import Joi from "joi";

export const rolesSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().allow("", null),
	permissions: Joi.array().items(Joi.string()).min(1).required(),
});

export const roleIdArraySchema = Joi.array()
	.items(Joi.string())
	.min(1)
	.required();
