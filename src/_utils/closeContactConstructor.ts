// get all dates from  starting day until current date
export const dates = (current) => {
	var week = new Array();
	for (var i = 0; i < 15; i++) {
		week.push(new Date(current).toISOString().split("T")[0]);
		current.setDate(current.getDate() + 1);
	}
	return week;
};

export const reformatVisitedLocation = (allVisitationfrom14Days) => {
	let visitedLocation = [];
	// reformat time data for comparison
	for (let i = 0; i < allVisitationfrom14Days.length; i++) {
		visitedLocation.push({
			location: allVisitationfrom14Days[i].location,
			action: allVisitationfrom14Days[i].action,
			date: allVisitationfrom14Days[i].date,
			time: new Date(
				`${allVisitationfrom14Days[i].date}T${allVisitationfrom14Days[i].time}:00.552Z`
			),
		});
	}

	return visitedLocation;
};

export const groupByKey = (array, key) => {
	const reducer = array.reduce((hash, obj) => {
		if (obj.userId.mobileNumber === undefined) return hash;
		return Object.assign(hash, {
			[obj.userId[key]]: (hash[obj.userId[key]] || []).concat(obj),
		});
	}, {});

	const result = [];
	const keys = Object.keys(reducer);

	for (let i = 0; i < keys.length; i++) {
		result.push(reducer[keys[i]]);
	}

	return result;
};
