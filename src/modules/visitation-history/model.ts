import { Schema, model, Document } from "mongoose";
export interface IVisitationLogs extends Document {
	location: string;
	time: string;
	action: string;
	userId: string;
	date: string;
}

const VisitationHistorySchema: Schema = new Schema({
	location: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	action: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
});

export const VisitationHistoryModel = model<IVisitationLogs>(
	"visitation-history",
	VisitationHistorySchema
);
