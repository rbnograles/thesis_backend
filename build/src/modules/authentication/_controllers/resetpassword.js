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
exports.resetPasswordController = void 0;
const model_1 = require("../../admin/model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const resetPasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = bcryptjs_1.default.hashSync(req.body.newPassword, 12);
    yield model_1.AdminAccountModel.findOneAndUpdate({ username: req.body.username }, { password: newPassword }, { returnOriginal: false });
    return res.status(200).json({ success: true });
});
exports.resetPasswordController = resetPasswordController;
