"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user, userType, tokenType) => {
    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        type: userType,
        role: user.role,
    };
    const token = generateJWT(tokenType, payload);
    return token;
};
exports.generateToken = generateToken;
function generateJWT(type, payload) {
    const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION, } = process.env;
    let token;
    if (type === "accessToken") {
        token = `Bearer ${jsonwebtoken_1.default.sign(payload, JWT_ACCESS_SECRET || "ACCESS_SECRET", {
            expiresIn: JWT_ACCESS_EXPIRATION ||
                (process.env.NODE_ENV === "development" ? "7d" : "1d"),
        })}`;
    }
    else if (type === "refreshToken") {
        token = `Bearer ${jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET || "REFRESH_SECRET", {
            expiresIn: JWT_REFRESH_EXPIRATION || "7d",
        })}`;
    }
    return token;
}
