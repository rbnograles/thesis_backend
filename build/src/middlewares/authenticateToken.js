"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const errors_1 = require("../_utils/errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    if (!req.headers.authorization)
        throw (0, errors_1.ForbiddenError)("No authorization headers.");
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
        throw (0, errors_1.ForbiddenError)("Authorization token not found.");
    jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET || "ACCESS_SECRET", (err) => {
        if (err) {
            throw (0, errors_1.ForbiddenError)(err.message);
        }
        next();
    });
};
exports.authenticateToken = authenticateToken;
