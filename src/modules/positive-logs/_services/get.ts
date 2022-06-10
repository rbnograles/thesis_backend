import { IPositiveLogsType, PositiveLogsModel } from "../model";
import { UserAccountModel } from "../../users/model";
import { VisitationHistoryModel } from "../../visitation-history/model";

export const getOneService = async (id: string): Promise<IPositiveLogsType> => {
	const result = await PositiveLogsModel.findById(id);
	return result;
};

export const getOneCloseContactServices = async (mobileNumber: string): Promise<any> => {

	let visitedLocation = [];
	let closeContactsVisitations = [];
	let allVisitationfrom14Days = [];

	const userInfo = await UserAccountModel.find({ mobileNumber: mobileNumber });
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
	// loop through the dates and get the visitation history
	for(let i = 0; i < past14Days.length; i++) {
		const userVisitationInfo = await VisitationHistoryModel.find({ 
			userId: userInfo[0]._id, 
			date: past14Days[i]
		});
		// if the user has visited the location
		if(userVisitationInfo.length > 0) {
			allVisitationfrom14Days.push(...userVisitationInfo);
		}
	}

	for (let i = 0; i < allVisitationfrom14Days.length; i++) {
		visitedLocation.push({
			location: allVisitationfrom14Days[i].location,
			action: allVisitationfrom14Days[i].action,
			date: allVisitationfrom14Days[i].date,
			time: new Date(`${allVisitationfrom14Days[i].date}T${allVisitationfrom14Days[i].time}:00.552Z`),
		});
	}

	const sortedByRevertedLocalTime = []
	const sortedByTimeGMT = visitedLocation.sort((a, b) => a.time - b.time);

	// for (let i = 0; i < sortedByTimeGMT.length; i++) {
	// 	sortedByRevertedLocalTime.push({
	// 		...sortedByTimeGMT[i],
	// 		time: JSON.stringify(sortedByTimeGMT[i].time).split('T')[1].split('.')[0]
	// 	})
	// }

	// reformat the data object to get the time in and time out
	for (let i = 0; i < sortedByTimeGMT.length; i++) {
		if(sortedByTimeGMT[i].action === 'Scanned the QR Code') {
			sortedByRevertedLocalTime.push({
				...sortedByTimeGMT[i],
				time: sortedByTimeGMT[i].time,
				timeOut: sortedByTimeGMT[i+1].time
			})
		}
	}

	// get the close contacts based on the visitation of the infected user
	for (let i = 0; i < sortedByRevertedLocalTime.length; i++) {
		
		const closeContacts = await VisitationHistoryModel.find({
			location: sortedByRevertedLocalTime[i].location,
			date: sortedByRevertedLocalTime[i].date,
		}).populate("userId");

		closeContactsVisitations.push(...closeContacts);
	}

	const formattedCloseContacts = []
	// get all data the is not of the infected user
	const filteredCollectionOfCloseContacts = closeContactsVisitations.filter(contact => contact.userId.mobileNumber !== mobileNumber);	
	// reconstruct the data object to format the time for filtering
	for(let i = 0; i < filteredCollectionOfCloseContacts.length; i++) {
		formattedCloseContacts.push({
			...filteredCollectionOfCloseContacts[i].toObject(),
			time : new Date(`${filteredCollectionOfCloseContacts[i].date}T${filteredCollectionOfCloseContacts[i].time}:00.552Z`)
		})
	}

	const finalFilter = []

	for (let i = 0; i < sortedByRevertedLocalTime.length; i++) {
		const resultData = formattedCloseContacts.filter(function (a) {
			var date = new Date(a.time);
			return (date >= sortedByRevertedLocalTime[i].time && date <= sortedByRevertedLocalTime[i].timeOut);
		});
		finalFilter.push(...resultData)
	}

	let check = {};
    let res = [];

    for(let i=0; i< finalFilter.length; i++) {
        if(!check[finalFilter[i]._id]){
            check[finalFilter[i]._id] = true;
            res.push(finalFilter[i]);
        }
    }

	return res

	// return closeContactsVisitations.filter(contact => contact.userId.mobileNumber !== mobileNumber);
};

// function to get all positive reports 
export const getAllReports = async (id: string) : Promise<any> => {

	return await PositiveLogsModel.find({ mobileNumber: id, healthStatus: "Positive" });
}

// function to get alert all close contacts
export const alertContacts = async (id: string) : Promise<any> => {

	const data = await getOneCloseContactServices(id);

	return data.filter((positive) => { return positive.userId.mobileNumber !== id });

}

// function to get all visitation history
export const getOneVisitationHistoryService = async (
	id: string
): Promise<any> => {
	const userInfo = await UserAccountModel.find({ mobileNumber: id });
	const userVisitationInfo = await VisitationHistoryModel.find({
		userId: userInfo[0]._id,
	});

	return userVisitationInfo;
};

// function to get all reports information
export const getManyService = async (): Promise<Array<IPositiveLogsType>> => {
	return await PositiveLogsModel.find();
};
