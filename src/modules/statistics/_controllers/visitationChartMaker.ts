import { RequestHandler } from "express";
import { LocationModel } from "../../locations/models";
import { VisitationHistoryModel } from "../../visitation-history/model";
import Moment from "moment";

export const weeklyVisitationStatus: RequestHandler = async (req, res, next) => {

    const collectiveWeeklyHeatlhReport = [];
    const finalRevisions = [];
    // prepare current week dates
    const dates = (current) => {
        
        var week= new Array(); 
        // Starting Monday not Sunday
        current.setDate((current.getDate() - current.getDay() + 1));
        for (var i = 0; i < 7; i++) {
            week.push(
                new Date(current).toISOString().split('T')[0]
            ); 
            current.setDate(current.getDate() + 1);
        }
        
        return week; 
    }

    const daysOfWeek = dates(new Date(req.params.selectedDate));
    
    // locations
    let locationList = [];
    
    const locations = await LocationModel.find({});

    for(let i = 0; i < locations.length; i++) {
        locationList.push(locations[i].name)
    }

    // start for filtering
    for(let day = 0; day < daysOfWeek.length; day++) {

        let temp = []

        for(let x = 0; x < locationList.length; x++) {
            
            let count = 0;

            const visitation = await VisitationHistoryModel.find({ location: locationList[x], action: "Scanned the QR Code" });
            // check all data
            for(let i = 0; i < visitation.length; i++) {
                if(JSON.stringify(visitation[i].date).includes(daysOfWeek[day])) {
                    count += 1;
                }
            }

            temp.push({
                date: Moment(daysOfWeek[day]).format("MMM DD"),
                [locationList[x]]: count
            })
        }
        
        collectiveWeeklyHeatlhReport.push(temp)
    }

    for(let i = 0; i < collectiveWeeklyHeatlhReport.length; i++) {
        finalRevisions.push(collectiveWeeklyHeatlhReport[i].reduce(
            function(result, current) {
                return Object.assign(result, current);
            }, {})
        ) 
    }

    return res.status(200).json({ 
        success: true,
        collectiveWeeklyHeatlhReport: finalRevisions
    });
};
