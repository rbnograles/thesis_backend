import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
	title: String;
	description: String;
	time: String;
	new: Boolean;
}

const notificationSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		time: {
			type: String;,
			required: true
		},
		new: {
			type: Boolean,
			default: true
		}
	}
);

export const NotificationModel = model<INotification>(
	"notification",
	notificationSchema
);
