import Joi from "joi";

export const locationSchema = Joi.object({
	name: Joi.string().required(),
	address: Joi.string().required(),
	officerInCharge: Joi.string().required(),
});

export const locationIdArraySchema = Joi.array()
	.items(Joi.string())
	.min(1)
	.required();
