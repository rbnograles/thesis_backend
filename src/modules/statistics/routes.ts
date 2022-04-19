import { Router } from "express";

// controllers
import { appStatisticsController } from "./_controllers/counter";
import { checkAccess } from "../../middlewares/checkAccess";

export const router = Router();

router
	.route("/all")
	.get(checkAccess(["Statistics:Read"]), appStatisticsController);

export default router;
