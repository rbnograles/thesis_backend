import { RequestHandler } from "express";
import { putOneService } from "../_services/put";

export const putOneController: RequestHandler = async (req, res, next) => {
	putOneService(req.params.id, req.body)
		.then((data) => {
			res.status(201).json({ success: true, data });
		})
		.catch(next);
};
