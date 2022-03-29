import Joi from "joi";

export const visitationHistorySchema = Joi.object({
	location: Joi.string().required(),
	time: Joi.string().required(),
	action: Joi.string().required(),
	userId: Joi.string().required(),
	date: Joi.string().required(),
});

export const visitationHistoryIdArraySchema = Joi.array()
	.items(Joi.string())
	.min(1)
	.required();
