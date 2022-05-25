import { Router } from "express";

// controllers
import { appStatisticsController } from "./_controllers/counter";
import { weeklyHealthStatus } from "./_controllers/chartDataMaker"
import { weeklyVisitationStatus } from "./_controllers/visitationChartMaker";
import { checkAccess } from "../../middlewares/checkAccess";

export const router = Router();

router
	.route("/all")
	.get(checkAccess(["Statistics:Read"]), appStatisticsController);

router.route("/weekly-health-status/:selectedDate").get(checkAccess(["Statistics:Read"]), weeklyHealthStatus);

router.route("/weekly-visitation-status/:selectedDate").get(checkAccess(["Statistics:Read"]), weeklyVisitationStatus);

export default router;
