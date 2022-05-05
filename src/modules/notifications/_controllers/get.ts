import { RequestHandler } from "express";
import { getOneService, getCountService } from "../_services/get";

export const getOneController: RequestHandler = async (req, res, next) => {
	try {
		const data = await getOneService(req.params.id);

		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};

export const getAllCountController: RequestHandler = async (req, res, next) => {
	try {
		const data = await getCountService(req.params.id);

		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};
