import { Request, Response } from "express";
// models
import PermissionService from "../_services/get";

const permissionService = new PermissionService();

// GET All Permissions
const getManyController = async (req: Request, res: Response) => {
	let result = await permissionService.getAllPermissions();

	if (!result.success) {
		return res.status(result.code).send(result);
	}

	res.status(200).send(result);
};
// GET One Permissions
const getOneController = async (req: Request, res: Response) => {
	const _id: string = req.params.id;
	let result = await permissionService.getOnePermissions(_id);

	if (!result.success) {
		return res.status(result.code).send(result);
	}

	res.status(200).send(result);
};

export { getManyController, getOneController };
