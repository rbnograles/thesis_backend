"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountModel = void 0;
const mongoose_1 = require("mongoose");
const userAccountSchema = new mongoose_1.Schema({
    mobileNumber: {
        type: String,
        required: true,
    },
    userHealthStatus: {
        type: String,
        default: "Normal",
    },
    userType: {
        type: String,
        default: "Guest",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
exports.UserAccountModel = (0, mongoose_1.model)("user", userAccountSchema);
