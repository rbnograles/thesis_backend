"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationIdArraySchema = exports.locationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.locationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    officerInCharge: joi_1.default.string().required(),
});
exports.locationIdArraySchema = joi_1.default.array()
    .items(joi_1.default.string())
    .min(1)
    .required();
