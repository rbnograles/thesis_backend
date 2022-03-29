import { ExistingError } from "../_utils/errors";
import mongoose from "mongoose";
import { RequestHandler } from "express";
/* eslint-disable  @typescript-eslint/no-explicit-any */
/**
 * Checks for any existing fields in the database.
 * Can be used in existingChecker middlewares.
 *
 * Pass a true boolean at the end of the parameters to prevent throwing of errors.
 *
 * @param field Matches the value against it.
 * @param valueToMatch Finds the existing field with the value assigned.
 * @param model The collection Model to use for finding.
 * @param noError Do not throw an error if set to true.
 */
export const isExistingInDatabase = async (
	field: string,
	valueToMatch: string | number,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	model: mongoose.Model<any>,
	noError?: boolean
): Promise<boolean> => {
	const matches = await model.findOne({ [field]: valueToMatch });

	if (matches) {
		if (!noError) {
			throw ExistingError(field);
		} else {
			return true;
		}
	} else {
		return false;
	}
};

/**
 * Checks for any existing fields in the database.
 * Can be used in existingChecker middlewares.
 *
 * This function will come after the checkDuplicates middleware
 *
 * @param fieldToCompare Matches the value against it. It must be the same value as the fieldToCompare in the checkDuplicate function
 * @param model The collection Model to use for finding.
 *
 * @returns Object with all the duplicated [fieldToCompare] values
 */

export const isManyExistingInDatabase = (
	model: mongoose.Model<any>,
	fieldToCompare: string | number
): RequestHandler => {
	return async (req, res, next) => {
		const duplicates: Array<string> = [];
		const existingData = await model.find({
			[fieldToCompare]: { $in: req.body[fieldToCompare] },
		});
		existingData.forEach((element: any) => {
			duplicates.push(element[fieldToCompare]);
		});

		if (existingData.length > 0)
			return res.status(400).json({
				success: false,
				message: `${fieldToCompare} already exist in the database`,
				duplicates: duplicates,
			});

		delete req.body[fieldToCompare];

		next();
	};
};
