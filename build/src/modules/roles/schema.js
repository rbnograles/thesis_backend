"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleIdArraySchema = exports.rolesSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.rolesSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().allow("", null),
    permissions: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
});
exports.roleIdArraySchema = joi_1.default.array()
    .items(joi_1.default.string())
    .min(1)
    .required();
