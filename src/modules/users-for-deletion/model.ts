import { Schema, model, Document } from "mongoose";

export interface IUserDeletionType extends Document, UserForDeletionSchema {}

export type UserForDeletionSchema = {
	mobileNumber: string;
	deletionDate: string;
};


const userForDeletionSchema = new Schema({
    // @ts-ignore
	mobileNumber: {
		type: String,
		required: true,
	},
    // @ts-ignore
	deletionDate: {
		type: String,
		default: "",
	},
});

// @ts-ignore
export const UserDeletionModel = model<UserForDeletionSchema>(
	"users-for-deletion",
	userForDeletionSchema
);
