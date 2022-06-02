import Joi from "joi";

export const diseaseSchema = Joi.object({
	name: Joi.string().required(),
	isPriority: Joi.boolean(),
	totalMonitoredToday: Joi.string().allow("", null),
	totalTraceCount: Joi.string().allow("", null),
});

export const diseaseIdArraySchema = Joi.array()
	.items(Joi.string())
	.min(1)
	.required();
