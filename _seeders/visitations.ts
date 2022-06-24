import { VisitationHistoryModel } from "../src/modules/visitation-history/model";

export const UserSeed = async (): Promise<void> => {
	const numbers = [];

	for (let i = 0; i < numbers.length; i++) {
		// use the create one controller
		await VisitationHistoryModel.create({
            location: "Twinville Church of Christ",
            time: "",
            date: "2022-05-10",
            userId: "6276678aae31be00167eca53",
            action:"Scanned the QR Code"
        })
	}
};
