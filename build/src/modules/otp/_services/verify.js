"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOneService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const model_1 = require("../model");
const model_2 = require("../../users/model");
const verifyOneService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.MobileOTPModel.findOne({
        mobileNumber: data.mobileNumber,
    });
    let userInfo = {};
    if (result !== null) {
        const isValidOTP = yield bcryptjs_1.default.compare(data.otpCode, result.otpCode);
        if (!isValidOTP) {
            return { isValidOTP: false, result: null };
        }
        userInfo = yield model_2.UserAccountModel.create({
            mobileNumber: data.mobileNumber,
            isVerified: true,
        });
        yield model_1.MobileOTPModel.deleteOne({
            _id: result._id,
        });
    }
    else {
        return { isValidOTP: false, result: null };
    }
    return { result: userInfo, isValidOTP: true };
});
exports.verifyOneService = verifyOneService;
