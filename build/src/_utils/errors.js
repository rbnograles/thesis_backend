"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientParamsError = exports.DatabaseError = exports.NotExistingError = exports.NotFoundError = exports.ExistingError = exports.InternalError = exports.AuthenticationError = exports.ForbiddenError = exports.BadRequestError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
const BadRequestError = (error) => new CustomError(400, error);
exports.BadRequestError = BadRequestError;
const ForbiddenError = (message, permissionRequired) => {
    if (message)
        console.log("Forbidden Error:", message);
    if (message === "TokenExpiredError") {
        return new CustomError(403, "Link expired");
    }
    else {
        return new CustomError(403, `You are not authorized to use this endpoint. ${permissionRequired}`);
    }
};
exports.ForbiddenError = ForbiddenError;
const AuthenticationError = (message) => new CustomError(400, message || "Authentication Failed");
exports.AuthenticationError = AuthenticationError;
const InternalError = (message) => new CustomError(500, message || "The server crashed, please try again.");
exports.InternalError = InternalError;
const ExistingError = (field) => new CustomError(409, (field ? field : "Resource") + " already exists.");
exports.ExistingError = ExistingError;
const NotFoundError = (message) => new CustomError(404, message || "Not found.");
exports.NotFoundError = NotFoundError;
const NotExistingError = (field) => new CustomError(409, (field ? field : "Resource") + " doesn't exist.");
exports.NotExistingError = NotExistingError;
const DatabaseError = (field) => new CustomError(410, field ? field : "Did you reseed? Clear the database before proceeding.");
exports.DatabaseError = DatabaseError;
const InsufficientParamsError = (...params) => new CustomError(400, `You have not set the correct parameters. [ERROR_${params
    .join("_")
    .toUpperCase()}_NULL]`);
exports.InsufficientParamsError = InsufficientParamsError;
