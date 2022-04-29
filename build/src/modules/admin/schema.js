"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminIdArraySchema = exports.adminPutSchema = exports.adminSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.adminSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    middleName: joi_1.default.string().allow("", null),
    lastName: joi_1.default.string().required(),
    suffix: joi_1.default.string().allow("", null),
    username: joi_1.default.string().required(),
    locationAssigned: joi_1.default.string().allow("", null),
    email: joi_1.default.string().email().required(),
    role: joi_1.default.string().required(),
});
exports.adminPutSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    middleName: joi_1.default.string().allow("", null),
    lastName: joi_1.default.string().required(),
    suffix: joi_1.default.string().allow("", null),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    locationAssigned: joi_1.default.string().allow("", null),
    role: joi_1.default.string().required(),
});
exports.adminIdArraySchema = joi_1.default.array()
    .items(joi_1.default.string())
    .min(1)
    .required();
