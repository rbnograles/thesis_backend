import Joi from "joi";
import { RequestHandler } from "express";
import { validateRequestSchema } from "../_utils/requestValidatorConfig";
/**
 * This is the source of validation for incomming request middlewares.
 * @param schema Joi.ObjectSchema
 * @returns
 */
export const validateRequest =
	(schema: Joi.ObjectSchema<void>): RequestHandler =>
	(req, res, next) => {
		try {
			validateRequestSchema(schema, req.body);
			next();
		} catch (err) {
			next(err);
		}
	};

export const validateMany =
	// schema : Joi schema for mass verification
	// key : request body key for a set of data inside an array


		(schema: Joi.ObjectSchema<void>, key: string): RequestHandler =>
		async (req, res, next) => {
			try {
				validateRequestSchema(Joi.array().items(schema), req.body[key]);
			} catch (err) {
				next(err);
			}
			next();
		};

export const validateArrayOfIds =
	(schema: Joi.ArraySchema): RequestHandler =>
	(req, res, next) => {
		try {
			validateRequestSchema(schema, req.body.idsToBeDeleted);
			next();
		} catch (error) {
			next(error);
		}
		next();
	};
