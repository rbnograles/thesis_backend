import { Schema, model, Document } from "mongoose";

export interface IUserAccountType extends Document, UserSchema {}

export type UserSchema = {
	mobileNumber: string;
	userHealthStatus: string;
	isVerified: string;
};

const userAccountSchema = new Schema({
	mobileNumber: {
		type: String,
		required: true,
	},
	userHealthStatus: {
		type: String,
		default: "Normal",
	},
	userType: {
		type: String,
		default: "Member",
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export const UserAccountModel = model<IUserAccountType>(
	"user",
	userAccountSchema
);
