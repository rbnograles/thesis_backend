import { Schema, model, Document } from "mongoose";

export interface IAdminAccountType extends Document, AdminSchema {}

export type AdminSchema = {
	firstName: string;
	middleName?: string;
	lastName: string;
	username: string;
	suffix?: string;
	email: string;
	locationAssigned?: string;
	password: string;
	role?: string;
};

const adminAccountSchema = new Schema({
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
	suffix: {
		type: String,
		default: "",
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	locationAssigned: {
		type: String,
		default: "",
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export const AdminAccountModel = model<IAdminAccountType>(
	"admin",
	adminAccountSchema
);
