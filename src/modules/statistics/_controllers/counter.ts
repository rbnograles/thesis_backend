import { RequestHandler } from "express";
import { UserAccountModel } from "@src/modules/users/model";
import { PositiveLogsModel } from "@src/modules/positive-logs/model";

export const appStatisticsController: RequestHandler = async (req, res, next) => {

    const totalUserCount = await UserAccountModel.find({});
    const totalActiveCases = await PositiveLogsModel.find({ healthStatus: "Positive" });
    const totalRecoveredCases = await PositiveLogsModel.find({ healthStatus: "Recivered" });
    const totalCloseContactCases = await PositiveLogsModel.find({});
    console.log(totalCloseContactCases)
    return res.status(200).json({ 
        success: true, 
        totalUserCount: totalUserCount.length, 
        totalActiveCases: totalActiveCases.length, 
        totalRecoveredCases: totalRecoveredCases.length, 
        totalCloseContactCases: totalCloseContactCases.length 
    });
};
