import { VisitationHistoryModel } from "../src/modules/visitation-history/model";
import { UserAccountModel } from "../src/modules/users/model";

const randomDate = (start, end, startHour, endHour) => {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

export const UserSeed = async (): Promise<void> => {
	const numbers = [];

    const data = await UserAccountModel.find({});
    const res = 0;
    console.log(res);

	// for (let i = 0; i < data.length; i++) {
	// 	// use the create one controller
	// 	await VisitationHistoryModel.create({
    //         location: "Twinville Church of Christ",
    //         time: "",
    //         date: "2022-07-17",
    //         userId: data[i]._id,
    //         action:"Scanned the QR Code"
    //     })
	// }
};
