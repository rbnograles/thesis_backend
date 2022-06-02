import { deleteManyService, deleteOneService } from "../_services/delete";

import { RequestHandler } from "express";

export const deleteOneController: RequestHandler = async (req, res, next) => {
	try {
		await deleteOneService(req.params.id);
		res.status(201).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const deleteManyController: RequestHandler = async (req, res, next) => {
	try {
		await deleteManyService(req.body.idsToBeDeleted);
		res.status(201).send({ success: true });
	} catch (err) {
		next(err);
	}
};
