import { ExistingError } from "./errors";
import mongoose from "mongoose";

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