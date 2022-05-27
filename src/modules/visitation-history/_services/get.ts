import { IVisitationLogs, VisitationHistoryModel } from "../model";

export const getOneService = async (id: string): Promise<IVisitationLogs> => {
	const result = await VisitationHistoryModel.findById(id);
	return result;
};

export const getUserPersonalDataService = async (id: string) => {
	let allVisitationfrom14Days = [];
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
		const input = await VisitationHistoryModel.find({ userId: id, date: past14Days[i], });
		if(input.length > 0) {
			allVisitationfrom14Days.push(...input);
		}
	}

	const roles = allVisitationfrom14Days.reduce((a, { userId, date, time, action, location }) => {
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

	let allVisitationfrom30Days : IVisitationLogs[] = [];
	const past30DayDate = new Date()
	// get the starting date counting back for 14 days
	past30DayDate.setDate(past30DayDate.getDate() - 30);
	// get all dates from  starting day until current date
	const dates = (current) => {
        var week= new Array(); 
        for (var i = 0; i < 31; i++) {
            week.push(
                new Date(current).toISOString().split('T')[0]
            ); 
            current.setDate(current.getDate() + 1);
        }
        return week; 
    }
	// initialized the dates function
	const past30Days = dates(past30DayDate)

	for(let i = 0; i < past30Days.length; i++) {
		const input = await VisitationHistoryModel.find({ date: past30Days[i] }).populate("userId");
		if(input.length > 0) {
			allVisitationfrom30Days.push(...input);
		}
	}

	return allVisitationfrom30Days
};
