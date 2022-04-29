"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAccountModel = void 0;
const mongoose_1 = require("mongoose");
const adminAccountSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        required: true,
    },
    suffix: {
        type: String,
        default: "",
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    locationAssigned: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
exports.AdminAccountModel = (0, mongoose_1.model)("admin", adminAccountSchema);
