"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositiveLogsModel = void 0;
const mongoose_1 = require("mongoose");
const PositiveLogsSchema = new mongoose_1.Schema({
    userType: {
        type: String,
        required: true,
    },
    healthStatus: {
        type: String,
        default: "Positive",
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now(),
    },
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
    nameExtension: {
        type: String,
        default: "",
    },
    studentNumber: {
        type: String,
        default: "",
    },
    facultyPosition: {
        type: String,
        default: "",
    },
    collegeDepartment: {
        type: String,
        default: "",
    },
    jobTitle: {
        type: String,
        default: "",
    },
    lotNumber: {
        type: String,
        default: "",
    },
    streetName: {
        type: String,
        default: "",
    },
    district: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    barangay: {
        type: String,
        default: "",
    },
    province: {
        type: String,
        default: "",
    },
});
exports.PositiveLogsModel = (0, mongoose_1.model)("positive-logs", PositiveLogsSchema);
