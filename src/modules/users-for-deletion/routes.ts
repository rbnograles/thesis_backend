import { Router } from "express";

import {
	createOneController,
} from "./_controllers/create";

export const router = Router();

router
	.route("/")
	.post(createOneController);

export default router;
