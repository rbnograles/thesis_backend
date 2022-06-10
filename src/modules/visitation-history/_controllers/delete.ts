import { deleteTestingVisitationService } from "../_services/delete";

import { RequestHandler } from "express";

export const deleteTesttingController: RequestHandler = async (req, res, next) => {
	try {
		await deleteTestingVisitationService();
		res.status(201).json({ success: true });
	} catch (err) {
		next(err);
	}
};