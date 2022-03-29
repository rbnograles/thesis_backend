import { IVisitationLogs, VisitationHistoryModel } from "../model";
import sgMail from "@sendgrid/mail";

const apiKey = process.env.SEND_GRID_API_KEY;

sgMail.setApiKey(apiKey);

export const createOneService = async (
	data: IVisitationLogs
): Promise<IVisitationLogs> => {
	const result = await VisitationHistoryModel.create(data);
	return result;
};
