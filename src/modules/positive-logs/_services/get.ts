import { IPositiveLogsType, PositiveLogsModel } from "../model";
import { UserAccountModel } from "../../users/model";
import { VisitationHistoryModel } from "../../visitation-history/model";
import { NotificationModel } from "../../notifications/model";
// util
import {
	dates,
	reformatVisitedLocation,
	groupByKey,
} from "../../../_utils/closeContactConstructor";

export const getOneService = async (id: string): Promise<IPositiveLogsType> => {
	const result = await PositiveLogsModel.findById(id);
	return result;
};

export const getOneCloseContactServices = async (
	mobileNumber: string
): Promise<any> => {
	// variable to store the result
	let closeContactsVisitations = [];
	let allVisitationfrom14Days = [];
	// get the current inital data today
	const past14DayDate = new Date();
	// get the starting date counting back for 14 days
	past14DayDate.setDate(past14DayDate.getDate() - 2 * 7);
	// get the user info
	const userInfo = await UserAccountModel.find({
		mobileNumber: mobileNumber,
	});

	// initialized the dates function
	const past14Days = dates(past14DayDate);
	// loop through the dates and get the visitation history
	for (let i = 0; i < past14Days.length; i++) {
		const userVisitationInfo = await VisitationHistoryModel.find({
			userId: userInfo[0]._id,
			date: past14Days[i],
		});
		// if the user has visited the location
		if (userVisitationInfo.length > 0) {
			allVisitationfrom14Days.push(...userVisitationInfo);
		}
	}

	// reformat time data for comparison
	const visitedLocation = reformatVisitedLocation(allVisitationfrom14Days);
	const sortedByRevertedLocalTime = [];
	const sortedByTimeGMT = visitedLocation.sort((a, b) => a.time - b.time);

	// reformat the data object to get the time in and time out
	for (let i = 0; i < sortedByTimeGMT.length; i++) {
		if (sortedByTimeGMT[i].action === "Scanned the QR Code") {
			sortedByRevertedLocalTime.push({
				...sortedByTimeGMT[i],
				time: sortedByTimeGMT[i].time,
				timeOut: sortedByTimeGMT[i + 1].time,
			});
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

	// get all data that is not of the infected user
	const filteredCollectionOfCloseContacts = closeContactsVisitations.filter(
		(contact) => contact.userId.mobileNumber !== mobileNumber
	);

	const formattedCloseContacts = [];
	// reconstruct the data object to format the time for filtering
	for (let i = 0; i < filteredCollectionOfCloseContacts.length; i++) {
		formattedCloseContacts.push({
			...filteredCollectionOfCloseContacts[i].toObject(),
			time: new Date(
				`${filteredCollectionOfCloseContacts[i].date}T${filteredCollectionOfCloseContacts[i].time}:00.552Z`
			),
		});
	}

	let groupedVisitationHistoryByNumber = groupByKey(
		formattedCloseContacts,
		"mobileNumber"
	);

	const formattedVisitationHistory = [];

	for (let i = 0; i < groupedVisitationHistoryByNumber.length; i++) {
		for (let j = 0; j < groupedVisitationHistoryByNumber[i].length; j++) {
			if (
				groupedVisitationHistoryByNumber[i][j].action ===
				"Scanned the QR Code"
			) {
				formattedVisitationHistory.push({
					...groupedVisitationHistoryByNumber[i][j],
					time: groupedVisitationHistoryByNumber[i][j].time,
					timeOut: groupedVisitationHistoryByNumber[i][j + 1].time,
				});
			}
		}
	}

	const finalFilter = [];
	let res = [];

	for (let i = 0; i < sortedByRevertedLocalTime.length; i++) {
		const resultData = formattedVisitationHistory.filter(function (a) {
			let timeIn = new Date(a.time);
			let timeOut = new Date(a.timeOut);
			return (
				timeIn >= sortedByRevertedLocalTime[i].time &&
				timeOut <= sortedByRevertedLocalTime[i].timeOut
			);
		});
		finalFilter.push(...resultData);
	}
	for (let i = 0; i < finalFilter.length; i++) {
		let diffInMS = Math.abs(
			new Date(finalFilter[i].timeOut).getTime() -
				new Date(finalFilter[i].time).getTime()
		);
		var mm = Math.floor(diffInMS / 1000 / 60);
		if (mm >= 15) {
			res.push({
				...finalFilter[i],
				totalContactDuration: `${mm} minutes`,
				time: JSON.stringify(finalFilter[i].time)
					.split("T")[1]
					.split(".")[0]
					.slice(0, -3),
				timeOut: JSON.stringify(finalFilter[i].timeOut)
					.split("T")[1]
					.split(".")[0]
					.slice(0, -3),
			});
		}
	}

	return res;
};

// function to get all positive reports
export const getAllReports = async (id: string): Promise<any> => {
	return await PositiveLogsModel.find({
		mobileNumber: id,
		healthStatus: "Positive",
	});
};

// function to get alert all close contacts
export const alertContacts = async (data: any): Promise<any> => {
	const time = new Date().toLocaleTimeString().split(":");
	for (let i = 0; i < data.mobileNumbers.length; i++) {
		await NotificationModel.create({
			new: true,
			time: `${time[0]}:${time[1]}`,
			mobileNumber: data.mobileNumbers[i],
			description: `You are being notified by the system that you have a previous encounter with a person who is said to be positive of ${data.disease}.`,
			title: "Close Contact Notice!",
		});
	}
};

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
