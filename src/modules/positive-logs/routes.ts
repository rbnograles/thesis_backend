import { Router } from "express";

// controllers
import { createOneController } from "./_controllers/create";
import {
	getManyController,
	getOneController,
	getAllCloseContactInformation,
	getOneVisitationHistory,
	alertAllCloseContactService,
	getAllReportsController,
} from "./_controllers/get";
// validators
import { putOneController } from "./_controllers/put";

export const router = Router();

router.route("/many").get(getManyController);

router.route("/:id").get(getOneController);
router.route("/close-contacts/reports/:id").get(getAllReportsController);
router.route("/close-contacts/:id").get(getAllCloseContactInformation);
router.route("/close-contacts/alert").post(alertAllCloseContactService);
router.route("/visitation-histroy/:id").get(getOneVisitationHistory);
router.route("/recovered/:id").put(putOneController);
router.route("/").post(createOneController);

export default router;
