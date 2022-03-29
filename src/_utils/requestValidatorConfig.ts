/* eslint-disable */
import Joi from "joi";
import { BadRequestError } from "./errors";

/**
 * This function handles all schema validations from the request body or payload
 * @param schema : Joi Schema
 * @param requestBody : data object
 * @returns
 */
export const validateRequestSchema = (
	schema: Joi.ObjectSchema<any> | Joi.ArraySchema,
	requestBody: any
): boolean => {
	const { error } = schema
		.options({ abortEarly: false })
		.validate(requestBody);
	if (error) {
		throw BadRequestError(error.message);
	}

	return true;
};
