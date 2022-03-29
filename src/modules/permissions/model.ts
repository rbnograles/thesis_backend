import { Schema, model, Document } from "mongoose";

export interface IPermission extends Document {
	name: String;
	description: String;
}

const permissionSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const PermissionModel = model<IPermission>(
	"permission",
	permissionSchema
);
