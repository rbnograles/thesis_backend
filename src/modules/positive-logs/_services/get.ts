import { IPositiveLogsType, PositiveLogsModel } from "../model";
import { UserAccountModel } from "../../users/model";
import { VisitationHistoryModel } from "../../visitation-history/model";

export const getOneService = async (id: string): Promise<IPositiveLogsType> => {
	const result = await PositiveLogsModel.findById(id);
	return result;
};

export const getOneCloseContactServices = async (id: string): Promise<any> => {

	let visitedLocation = [];
	let closeContactsVisitations = [];
	let allVisitationfrom14Days = [];

	const userInfo = await UserAccountModel.find({ mobileNumber: id });
	const past14DayDate = new Date()
	// get the starting date counting back for 14 days
	past14DayDate.setDate(past14DayDate.getDate() - 2 * 7);

	// get all dates from  starting day until current date
	const dates = (current) => {
        var week= new Array(); 
        for (var i = 0; i < 15; i++) {
            week.push(
                new Date(current).toISOString().split('T')[0]
            ); 
            current.setDate(current.getDate() + 1);
        }
        return week; 
    }

	// initialized the dates function
	const past14Days = dates(past14DayDate)

	for(let i = 0; i < past14Days.length; i++) {
		const userVisitationInfo = await VisitationHistoryModel.find({ userId: userInfo[0]._id, date: past14Days[i], action: "Scanned the QR Code" });
		if(userVisitationInfo.length > 0) {
			allVisitationfrom14Days.push(...userVisitationInfo);
		}
	}

	for (let i = 0; i < allVisitationfrom14Days.length; i++) {
		visitedLocation.push({
			location: allVisitationfrom14Days[i].location,
			date: allVisitationfrom14Days[i].date,
			time: allVisitationfrom14Days[i].time,
		});
	}

	for (let i = 0; i < visitedLocation.length; i++) {
		
		const closeContacts = await VisitationHistoryModel.find({
			location: visitedLocation[i].location,
			date: visitedLocation[i].date,
			action: "Scanned the QR Code"
		}).populate("userId");

		closeContactsVisitations.push(...closeContacts);
	}
	return closeContactsVisitations;
};

export const getOneVisitationHistoryService = async (
	id: string
): Promise<any> => {
	const userInfo = await UserAccountModel.find({ mobileNumber: id });
	const userVisitationInfo = await VisitationHistoryModel.find({
		userId: userInfo[0]._id,
	});

	return userVisitationInfo;
};

export const getManyService = async (): Promise<Array<IPositiveLogsType>> => {
	return await PositiveLogsModel.find();
};
