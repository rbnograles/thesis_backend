import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
	name: string;
	description: string;
	permissions: string[];
}

const RoleSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
		permissions: [{ type: Schema.Types.ObjectId, ref: "permission" }],
	},
	{
		timestamps: true,
	}
);

export const RoleModel = model<IRole>("Role", RoleSchema);
