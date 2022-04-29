"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestSchema = void 0;
const errors_1 = require("./errors");
const validateRequestSchema = (schema, requestBody) => {
    const { error } = schema
        .options({ abortEarly: false })
        .validate(requestBody);
    if (error) {
        throw (0, errors_1.BadRequestError)(error.message);
    }
    return true;
};
exports.validateRequestSchema = validateRequestSchema;
