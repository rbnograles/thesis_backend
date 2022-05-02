import { Schema, model, Document } from "mongoose";

export interface IPositiveLogsType extends Document, PositiveTypeSchema {}

export type PositiveTypeSchema = {
	userType: string;
	healthStatus: string;
	contactNumber: string;
	date: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	nameExtension?: string;
	lotNumber?: string;
	streetName?: string;
	district?: string;
	city?: string;
	barangay?: string;
	province?: string;
};

const PositiveLogsSchema = new Schema({
	userType: {
		type: String,
		required: true,
	},
	healthStatus: {
		type: String,
		default: "Positive",
	},
	mobileNumber: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		default: Date.now(),
	},
	firstName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
		default: "",
	},
	lastName: {
		type: String,
		required: true,
	},
	nameExtension: {
		type: String,
		default: "",
	},
	lotNumber: {
		type: String,
		default: "",
	},
	streetName: {
		type: String,
		default: "",
	},
	district: {
		type: String,
		default: "",
	},
	city: {
		type: String,
		default: "",
	},
	barangay: {
		type: String,
		default: "",
	},
	province: {
		type: String,
		default: "",
	},
});

export const PositiveLogsModel = model<IPositiveLogsType>(
	"positive-logs",
	PositiveLogsSchema
);
