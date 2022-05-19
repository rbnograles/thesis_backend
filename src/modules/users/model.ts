import { Schema, model, Document } from "mongoose";

export interface IUserAccountType extends Document, UserSchema {}

export type UserSchema = {
	mobileNumber: string;
	userHealthStatus: string;
	isVerified: string;
	createdAt?: string;
};

const userAccountSchema = new Schema({
	// @ts-ignore
	mobileNumber: {
		type: String,
		required: true,
	},
	// @ts-ignore
	userHealthStatus: {
		type: String,
		default: "Normal",
	},
	// @ts-ignore
	userType: {
		type: String,
		default: "Member",
	},
	// @ts-ignore
	isVerified: {
		type: Boolean,
		default: false,
	},
	// @ts-ignore
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
// @ts-ignore
export const UserAccountModel = model<IUserAccountType>(
	"user",
	userAccountSchema
);
