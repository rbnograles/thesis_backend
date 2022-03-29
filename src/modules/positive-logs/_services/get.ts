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

	const userInfo = await UserAccountModel.find({ mobileNumber: id });
	const userVisitationInfo = await VisitationHistoryModel.find({
		userId: userInfo[0]._id,
	});

	for (let i = 0; i < userVisitationInfo.length; i++) {
		visitedLocation.push({
			location: userVisitationInfo[i].location,
			date: userVisitationInfo[i].date,
			time: userVisitationInfo[i].time,
		});
	}

	visitedLocation = visitedLocation.filter(
		(v, i, a) => a.findIndex((t) => t.id === v.id) === i
	);

	console.log(visitedLocation);

	for (let y = 0; y < visitedLocation.length; y++) {
		const closeContacts = await VisitationHistoryModel.find({
			location: visitedLocation[y].location,
			date: visitedLocation[y].date,
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
