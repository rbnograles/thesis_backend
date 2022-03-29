import { ForbiddenError } from "../_utils/errors";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

export const authenticateToken: RequestHandler = (req, res, next) => {
	if (!req.headers.authorization)
		throw ForbiddenError("No authorization headers.");

	const token = req.headers.authorization.split(" ")[1];

	if (!token) throw ForbiddenError("Authorization token not found.");

	jwt.verify(
		token,
		process.env.JWT_ACCESS_SECRET || "ACCESS_SECRET",
		(err) => {
			if (err) {
				throw ForbiddenError(err.message);
			}
			next();
		}
	);
};
