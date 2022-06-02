import { Schema, model, Document } from "mongoose";

export interface IDiseaseType extends Document, DiseaseTypeSchema {}

export type DiseaseTypeSchema = {
	name: string;
	isPriority: boolean;
	totalMonitoredToday: string;
	totalTraceCount: string;
};

const DiseaseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	isPriority: {
		type: Boolean,
		default: false,
	},
	totalMonitoredToday: {
		type: String,
		default: "",
	},
	totalTraceCount: {
		type: String,
		default: "",
	}
});

export const DiseaseModel = model<IDiseaseType>("disease", DiseaseSchema);
