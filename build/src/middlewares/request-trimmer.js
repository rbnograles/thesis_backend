"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimRequests = void 0;
const trimmer = (input) => {
    if (typeof input === "string")
        return input.trim();
    if (input !== null && typeof input === "object") {
        Object.keys(input).forEach((key) => {
            input[key] = trimmer(input[key]);
        });
    }
    return input;
};
const trimRequests = (req, res, next) => {
    const fields = ["body", "params", "query"];
    fields.forEach((field) => {
        if (req[field]) {
            req[field] = trimmer(req[field]);
        }
    });
    next();
};
exports.trimRequests = trimRequests;
