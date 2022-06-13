import { RequestHandler } from "express";
import {
	getManyService,
	getOneService,
	getOneCloseContactServices,
	getOneVisitationHistoryService,
	alertContacts,
	getAllReports,
} from "../_services/get";

export const getOneController: RequestHandler = async (req, res, next) => {
	try {
		const data = await getOneService(req.params.id);

		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};

export const getAllCloseContactInformation: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const data = await getOneCloseContactServices(req.params.id);
		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};

export const getAllReportsController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const data = await getAllReports(req.params.id);
		res.status(201).json({ success: true, data: data });
	} catch (err) {
		next(err);
	}
};

export const alertAllCloseContactService: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const data = await alertContacts(req.body);
		res.status(201).json({ success: true, data: data });
	} catch (error) {
		next(error);
	}
};

export const getOneVisitationHistory: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const data = await getOneVisitationHistoryService(req.params.id);

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
