import { RequestHandler } from "express";
import { UserAccountModel } from "../../users/model";
import { PositiveLogsModel } from "../../positive-logs/model";

export const appStatisticsController: RequestHandler = async (req, res, next) => {

    const totalUserCount = await UserAccountModel.find({});
    const totalActiveCases = await PositiveLogsModel.find({ healthStatus: "Positive" });
    const totalRecoveredCases = await PositiveLogsModel.find({ healthStatus: "Recivered" });
    const totalCloseContactCases = await PositiveLogsModel.find({});

    return res.status(200).json({ 
        success: true, 
        totalUserCount: totalUserCount.length, 
        totalActiveCases: totalActiveCases.length, 
        totalRecoveredCases: totalRecoveredCases.length, 
        totalCloseContactCases: totalCloseContactCases.length 
    });
};
