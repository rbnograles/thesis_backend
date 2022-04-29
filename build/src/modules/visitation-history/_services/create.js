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
exports.createOneService = void 0;
const model_1 = require("../model");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const apiKey = process.env.SEND_GRID_API_KEY;
mail_1.default.setApiKey(apiKey);
const createOneService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.VisitationHistoryModel.create(data);
    return result;
});
exports.createOneService = createOneService;
