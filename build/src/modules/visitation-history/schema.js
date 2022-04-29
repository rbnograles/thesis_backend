"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitationHistoryIdArraySchema = exports.visitationHistorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.visitationHistorySchema = joi_1.default.object({
    location: joi_1.default.string().required(),
    time: joi_1.default.string().required(),
    action: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    date: joi_1.default.string().required(),
});
exports.visitationHistoryIdArraySchema = joi_1.default.array()
    .items(joi_1.default.string())
    .min(1)
    .required();
