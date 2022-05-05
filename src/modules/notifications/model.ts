import { Schema, model, Document } from "mongoose";

export interface INotification extends Document, NotificatioSchema {}
export type NotificatioSchema = {
	title: string;
	description: string;
	time: string;
	new: boolean;
}

const notificationSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true
	},
	new: {
		type: Boolean,
		required: false
	}
});

export const NotificationModel = model<INotification>(
	"notification",
	notificationSchema
);
