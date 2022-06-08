import { RequestHandler } from "express";
import { putOneRecoveredService } from "../_services/put";

export const putOneController: RequestHandler = async (req, res, next) => {
	putOneRecoveredService(req.params.id)
		.then((data) => {
			res.status(201).json({ success: true });
		})
		.catch(next);
};


