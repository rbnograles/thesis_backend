"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagebird = void 0;
const messagebird_1 = __importDefault(require("messagebird"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessKey = process.env.messageBirdTestKey;
exports.messagebird = (0, messagebird_1.default)(accessKey);
