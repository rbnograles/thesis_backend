import { Router } from "express";

// controllers
import { createOneController } from "./_controllers/create";
import { getManyController, getOneController, getUserPersonalDataController } from "./_controllers/get";
// validators
import { checkAccess } from "../../middlewares/checkAccess";
import { validateRequest } from "../../middlewares/requestValidator";

// schemas, models, utilities
import { visitationHistorySchema } from "./schema";

export const router = Router();

router.route("/:id").get(checkAccess(["Admin:Read"]), getOneController);

router.route("/many").get(checkAccess(["Admin:Read"]), getManyController);

router.route("/personal/:id").get(getUserPersonalDataController);

router
	.route("/")
	.post(validateRequest(visitationHistorySchema), createOneController);

export default router;
