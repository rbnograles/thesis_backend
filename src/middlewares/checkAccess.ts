import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// models
import { PermissionModel } from "../modules/permissions";
import { RoleModel } from "../modules/roles/model";

export const checkAccess = (scopes: Array<String>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		// get jwt token
		const token = req.headers.authorization.split(" ")[1];
		// initial item
		let userRole: string;
		// verify token signature
		jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET || "hello world",
			(err, decoded: any) => {
				userRole = decoded?.role;
			}
		);

		const permissionNames: Array<String> = [];
		// get role
		const roles = await RoleModel.findOne({ name: userRole });
		// get the permissions details
		const permissions = await PermissionModel.find({
			_id: { $in: [...roles.permissions] },
		});
		// loop through all permissions
		for (let i in permissions) {
			permissionNames.push(permissions[i].name);
		}

		let found: boolean = true;
		// check if the user has the defined scope stated
		for (let i in scopes) {
			if (!permissionNames.includes(scopes[i])) {
				found = false;
				res.status(403).send({
					success: false,
					message: "You do not have a permission for this module",
				});
				break;
			}
		}

		found && next();
	};
};
