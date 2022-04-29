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
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStatisticsController = void 0;
const model_1 = require("../../users/model");
const model_2 = require("../../positive-logs/model");
const appStatisticsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const totalUserCount = yield model_1.UserAccountModel.find({});
    const totalActiveCases = yield model_2.PositiveLogsModel.find({ healthStatus: "Positive" });
    const totalRecoveredCases = yield model_2.PositiveLogsModel.find({ healthStatus: "Recivered" });
    const totalCloseContactCases = yield model_2.PositiveLogsModel.find({});
    return res.status(200).json({
        success: true,
        totalUserCount: totalUserCount.length,
        totalActiveCases: totalActiveCases.length,
        totalRecoveredCases: totalRecoveredCases.length,
        totalCloseContactCases: totalCloseContactCases.length
    });
});
exports.appStatisticsController = appStatisticsController;
