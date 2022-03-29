import { RequestHandler } from "express";
import { createOneService } from "../_services/create";

export const createOneController: RequestHandler = async (req, res, next) => {
	try {
		const data = await createOneService(req.body);

		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};
