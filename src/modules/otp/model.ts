import { Schema, model, Document } from "mongoose";

export interface IMobileOTPType extends Document, MobileOTPTypeSchema {}

export type MobileOTPTypeSchema = {
	mobileNumber: string;
	otpCode: string;
	isVerified: boolean;
	createdAt: number;
	expiresAt: number;
};

const MobileOTPSchema = new Schema({
	mobileNumber: {
		type: String,
		required: true,
	},
	otpCode: {
		type: String,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Number,
		default: Date.now(),
	},
	expiresAt: {
		type: Number,
		default: Date.now() + 120000,
	},
});

export const MobileOTPModel = model<IMobileOTPType>(
	"mobile-otp",
	MobileOTPSchema
);
