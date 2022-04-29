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
exports.verifyOneController = exports.createOneController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const otpGenerator_1 = require("../../../_utils/otpGenerator");
const create_1 = require("../../otp/_services/create");
const verify_1 = require("../../otp/_services/verify");
const createOneController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require("twilio")(accountSid, authToken);
        const systemNumber = "+19377213296";
        const clientNumber = `+63${req.body.mobileNumber}`;
        const otp = (0, otpGenerator_1.generateOTPCode)();
        const hashedOTP = yield bcryptjs_1.default.hash(otp.toString(), 12);
        (0, create_1.createOneService)({ mobileNumber: clientNumber, otpCode: hashedOTP });
        client.messages
            .create({
            body: `Your OTP Verification Code is ${otp}. This will expire in 2 minutes. Do not share this with anyone.`,
            from: systemNumber,
            to: clientNumber,
        })
            .then((message) => res
            .status(200)
            .json({ success: true, otp: otp, message: message }))
            .catch((err) => {
            console.log(err.response);
            res.status(200).json({ success: false, message: err });
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createOneController = createOneController;
const verifyOneController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientNumber = `${req.body.mobileNumber}`;
        const otpCode = req.body.otpCode;
        const verificationStatus = yield (0, verify_1.verifyOneService)({
            mobileNumber: clientNumber,
            otpCode: otpCode,
        });
        if (verificationStatus.result === null &&
            !verificationStatus.isValidOTP) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP Code, please request again.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Verification Completed",
            result: verificationStatus,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.verifyOneController = verifyOneController;
