import { Schema, model, Document } from "mongoose";

export interface IDiseaseType extends Document, DiseaseTypeSchema {}

export type DiseaseTypeSchema = {
	name: string;
	isPriority: boolean;
	totalMonitoredToday: string;
	totalTraceCount: string;
	createdAt: string;
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
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}		
});

export const DiseaseModel = model<IDiseaseType>("disease", DiseaseSchema);
