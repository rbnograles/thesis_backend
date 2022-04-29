"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileOTPModel = void 0;
const mongoose_1 = require("mongoose");
const MobileOTPSchema = new mongoose_1.Schema({
    mobileNumber: {
        type: String,
        required: true,
    },
    otpCode: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
    expiresAt: {
        type: Number,
        default: Date.now() + 120000,
    },
});
exports.MobileOTPModel = (0, mongoose_1.model)("mobile-otp", MobileOTPSchema);
