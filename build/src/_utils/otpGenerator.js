"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTPCode = void 0;
const generateOTPCode = () => {
    const val = Math.floor(1000 + Math.random() * 9000);
    return val;
};
exports.generateOTPCode = generateOTPCode;
