"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordSchema = exports.ResetPasswordSchema = exports.LoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LoginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.ResetPasswordSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
    confirmNewPassword: joi_1.default.string().required(),
});
exports.ForgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
