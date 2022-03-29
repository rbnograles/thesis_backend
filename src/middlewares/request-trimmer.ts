import { RequestHandler, Request, Response, NextFunction } from "express";

/**
 * This function will loop through all keys inside the request object and trim them accordinly
 * @param input : any field name 
 * @returns 
 */
const trimmer = (input?: any) => {
	if (typeof input === "string") return input.trim();

	if (input !== null && typeof input === "object") {
		Object.keys(input).forEach((key) => {
			input[key] = trimmer(input[key]);
		});
	}
	return input;
};

/**
 * This function will take the request body and trim each input to avoid white spaces
 * @param req 
 * @param res 
 * @param next 
 */
export const trimRequests: RequestHandler = (req : Request, res: Response, next: NextFunction) => {
	const fields = ["body", "params", "query"];
	fields.forEach((field) => {
		if(req[field]){
            req[field] = trimmer(req[field])
        }
	});
	next();
};
