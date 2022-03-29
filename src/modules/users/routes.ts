import { Router } from "express";

// controllers
import { getManyController, getOneController } from "./_controllers/get";
import { putOneUserTypeController } from "./_controllers/put";
// validators
import { checkAccess } from "../../middlewares/checkAccess";

// schemas, models, utilities

export const router = Router();

router.route("/many").get(checkAccess(["Users:Read"]), getManyController);

router
	.route("/:id")
	.put(putOneUserTypeController)
	.get(checkAccess(["Users:Read"]), getOneController);

export default router;
