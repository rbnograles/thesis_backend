import { RequestHandler } from "express";
import { UserAccountModel } from "../../users/model";
import { PositiveLogsModel } from "../../positive-logs/model";

export const appStatisticsController: RequestHandler = async (req, res, next) => {

    let userToday = 0;
    let positiveToday = 0;
    let recoveredToday = 0;
    let normalToday = 0;

    const date = new Date().toISOString().split('T')[0];
    
    const totalUserCount = await UserAccountModel.find({});

    for(let i = 0; i < totalUserCount.length; i++) {
        if(JSON.stringify(totalUserCount[i].createdAt).split('T')[0].includes(date)) {
            userToday += 1;
        }
    }

    const totalActiveCases = await PositiveLogsModel.find({ healthStatus: "Positive" });

    for(let i = 0; i < totalActiveCases.length; i++) {
        if(JSON.stringify(totalActiveCases[i].createdAt).split('T')[0].includes(date)) {
            positiveToday += 1;
        }
    }

    const totalRecoveredCases = await PositiveLogsModel.find({ healthStatus: "Recovered" });

    for(let i = 0; i < totalRecoveredCases.length; i++) {
        if(JSON.stringify(totalRecoveredCases[i].createdAt).split('T')[0].includes(date)) {
            recoveredToday += 1;
        }
    }

    const totalNormalUsers = await UserAccountModel.find({ userHealthStatus: "Normal" });

    for(let i = 0; i < totalNormalUsers.length; i++) {
        if(JSON.stringify(totalNormalUsers[i].createdAt).split('T')[0].includes(date)) {
            normalToday += 1;
        }
    }
 
    return res.status(200).json({ 
        success: true, 
        userToday: userToday,
        positiveToday: positiveToday,
        recoveredToday: recoveredToday,
        normalToday: normalToday,
        totalUserCount: totalUserCount.length, 
        totalActiveCases: totalActiveCases.length, 
        totalRecoveredCases: totalRecoveredCases.length, 
        totalNormalUsers: totalNormalUsers.length 
    });
};
