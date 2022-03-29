/**
 * The source of truth for the custom error.
 */
export class CustomError extends Error {
	statusCode: number;

	constructor(statusCode: number, message: string) {
		super();
		this.message = message;
		this.statusCode = statusCode;
	}
}

/**
 * Throw this if the request object fails validation.
 */
export const BadRequestError = (error: string): CustomError =>
	new CustomError(400, error);

/**
 * Throw this if the request lacks authentication.
 */
export const ForbiddenError = (
	message?: string,
	permissionRequired?: string
): CustomError => {
	if (message) console.log("Forbidden Error:", message);
	if (message === "TokenExpiredError") {
		return new CustomError(403, "Link expired");
	} else {
		return new CustomError(
			403,
			`You are not authorized to use this endpoint. ${permissionRequired}`
		);
	}
};

/**
 * Throw this if the user fails authentication
 */
export const AuthenticationError = (message: string): CustomError =>
	new CustomError(400, message || "Authentication Failed");

/**
 * Throw this if the request caused the API to crash internally.
 */
export const InternalError = (message?: string): CustomError =>
	new CustomError(500, message || "The server crashed, please try again.");

/**
 * Throw this if there is an existing function.
 */
export const ExistingError = (field?: string): CustomError =>
	new CustomError(409, (field ? field : "Resource") + " already exists.");

/**
 * Throw this if the requested resource is not found.
 */
export const NotFoundError = (message?: string): CustomError =>
	new CustomError(404, message || "Not found.");

/**
 * Throw this if there is no existing function.
 */
export const NotExistingError = (field?: string): CustomError =>
	new CustomError(409, (field ? field : "Resource") + " doesn't exist.");

export const DatabaseError = (field?: string): CustomError =>
	new CustomError(
		410,
		field ? field : "Did you reseed? Clear the database before proceeding."
	);

export const InsufficientParamsError = (
	...params: Array<string>
): CustomError =>
	new CustomError(
		400,
		`You have not set the correct parameters. [ERROR_${params
			.join("_")
			.toUpperCase()}_NULL]`
	);
