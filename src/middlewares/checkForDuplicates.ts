import { RequestHandler } from "express";
/**
 *
 * @param requestField is the field from the request body
 * @param fieldToCompare is the field where comparison will be based to determine a duplicate
 * @returns request body plus the duplicate names
 */
export const checkDuplicates = (
	requestField: string | number, // actual key of the array ex. { "data" : [] } pass the word data
	field: string | number | string[] // key for comparison ex. { "data": [ { "item" : "test" }] } pass in the word item
): RequestHandler => {
	return (req, res, next) => {
		// For student and staff
		let fieldToCompare: any = field;

		const items = req.body[requestField];
		const duplicates = [];

		// Array of values
		const valueArr = items.map((item) => {
			const arrayItem = Array.isArray(fieldToCompare)
				? fieldToCompare.map((e) => item[e]).join(" ")
				: item[fieldToCompare];

			return arrayItem;
		});

		const sorted_arr = valueArr.slice().sort();

		for (let i = 0; i < sorted_arr.length - 1; i++) {
			if (sorted_arr[i + 1] === sorted_arr[i]) {
				duplicates.push(sorted_arr[i]);
			}
		}

		if (duplicates.length > 0)
			return res.status(400).json({
				success: false,
				message: `Duplicates for the ${fieldToCompare} property are found on this data set`,
				data: duplicates,
			});

		req.body = { ...req.body, [fieldToCompare]: valueArr };

		next();
	};
};
