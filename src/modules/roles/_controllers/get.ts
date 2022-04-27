import { RequestHandler } from "express";
import { getManyService, getOneService, getOneRoleExclusiveService } from "../_services/get";

export const getOneController: RequestHandler = async (req, res, next) => {
	try {
		const data = await getOneService(req.params.id);

		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};

export const getOneRoleExclusiveController: RequestHandler = async (req, res, next) => {
	try {
		const data = await getOneRoleExclusiveService(req.params.rolename);
		console.log(data)
		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};

export const getManyController: RequestHandler = async (req, res, next) => {
	try {
		const data = await getManyService();

		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};
