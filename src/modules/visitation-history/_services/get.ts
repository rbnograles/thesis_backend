import { IVisitationLogs, VisitationHistoryModel } from "../model";

export const getOneService = async (id: string): Promise<IVisitationLogs> => {
	const result = await VisitationHistoryModel.findById(id);
	return result;
};

export const getUserPersonalDataService = async (id: string) => {
	const input = await VisitationHistoryModel.find({ userId: id });

	const roles = input.reduce((a, { userId, date, time, action, location }) => {
		// find items that have the same date on the list
		const foundRole = a.find(({ visitDate }) => visitDate === date);
		// if found construct an object for them
		if (foundRole) foundRole.visitation.push({ location, time, action, userId });
		// if same push to the current object on the visitation array
		else a.push({ visitDate: date, visitation: [{ location, time, action, userId }] });
		// return all segregated data
		return a;
	}, []);

	return roles

};

export const getManyService = async (): Promise<Array<IVisitationLogs>> => {
	return await VisitationHistoryModel.find().populate("userId");
};
