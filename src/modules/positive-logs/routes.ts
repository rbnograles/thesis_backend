import { Router } from "express";

// controllers
import { createOneController } from "./_controllers/create";
import {
	getManyController,
	getOneController,
	getAllCloseContactInformation,
	getOneVisitationHistory,
} from "./_controllers/get";
// validators
import { putOneController } from "./_controllers/put";

export const router = Router();

router.route("/many").get(getManyController);

router.route("/:id").get(getOneController);
router.route("/close-contacts/:id").get(getAllCloseContactInformation);
router.route("/visitation-histroy/:id").get(getOneVisitationHistory);
router.route("/recovered").put(putOneController)
router.route("/").post(createOneController);

export default router;
