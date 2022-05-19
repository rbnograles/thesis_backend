import { RequestHandler } from "express";
import { UserAccountModel } from "../../users/model";
import { PositiveLogsModel } from "../../positive-logs/model";
import Moment from "moment";

export const weeklyHealthStatus: RequestHandler = async (req, res, next) => {

    const collectiveWeeklyHeatlhReport = [];

    const dates = (current) => {
        var week= new Array(); 
        // Starting Monday not Sunday
        current.setDate((current.getDate() - current.getDay() +1));
        for (var i = 0; i < 7; i++) {
            week.push(
                new Date(current).toISOString().split('T')[0]
            ); 
            current.setDate(current.getDate() +1);
        }
        return week; 
    }

    const daysOfWeek = dates(new Date());

    for(let day = 0; day < daysOfWeek.length; day++) {

        // counters
        let positiveToday = 0;
        let recoveredToday = 0;
        let normalToday = 0;
        
        // get all daya statues
        const positives = await PositiveLogsModel.find({ healthStatus: "Positive" });
        const recovered = await PositiveLogsModel.find({ healthStatus: "Recovered" });
        const normal = await UserAccountModel.find({ userHealthStatus: "Normal" });

        // check all data
        for(let i = 0; i < positives.length; i++) {
            if(JSON.stringify(positives[i].createdAt).split('T')[0].includes(daysOfWeek[day])) {
                positiveToday += 1;
            }
        }

        for(let i = 0; i < recovered.length; i++) {
            if(JSON.stringify(recovered[i].createdAt).split('T')[0].includes(daysOfWeek[day])) {
                recoveredToday += 1;
            }
        }

        for(let i = 0; i < normal.length; i++) {
            if(JSON.stringify(normal[i].createdAt).split('T')[0].includes(daysOfWeek[day])) {
                normalToday += 1;
            }
        }

        collectiveWeeklyHeatlhReport.push(
            {
                date: Moment(daysOfWeek[day]).format("MMM DD"),
                "New User": normalToday,
                Positive: positiveToday,
                Recovered: recoveredToday,
            }
        )
    }

    return res.status(200).json({ 
        success: true,
        collectiveWeeklyHeatlhReport: collectiveWeeklyHeatlhReport
    });
};
