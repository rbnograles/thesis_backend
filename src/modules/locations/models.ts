import { Schema, model, Document } from "mongoose";

export interface ILocationType extends Document, LocationTypeSchema {}

export type LocationTypeSchema = {
	name: string;
	address: string;
	officerInCharge: string;
};

const LocationSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		default: "",
	},
	officerInCharge: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export const LocationModel = model<ILocationType>("location", LocationSchema);
