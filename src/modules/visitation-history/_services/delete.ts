import { VisitationHistoryModel } from "../model";

export const deleteTestingVisitationService = async (): Promise<boolean> => {
	await VisitationHistoryModel.deleteMany({ userId: "6281d4262e0f6a00169d985d" });
	return true;
};