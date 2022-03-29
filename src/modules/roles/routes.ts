import { Router } from "express";

// controllers
import { getManyController, getOneController } from "./_controllers/get";
import { checkAccess } from "../../middlewares/checkAccess";
import { createOneController } from "./_controllers/create";
import { putOneController } from "./_controllers/put";
import {
	deleteManyController,
	deleteOneController,
} from "./_controllers/delete";

// validators
import {
	validateRequest,
	validateArrayOfIds,
} from "../../middlewares/requestValidator";

// schemas, models, utilities
import { rolesSchema, roleIdArraySchema } from "./schema";

export const router = Router();

router
	.route("/many")
	.get(checkAccess(["Role:Read"]), getManyController)
	.delete(
		checkAccess(["Role:Read", "Role:Delete"]),
		validateArrayOfIds(roleIdArraySchema),
		deleteManyController
	);

router
	.route("/:id")
	.get(checkAccess(["Role:Read"]), getOneController)
	.delete(checkAccess(["Role:Read", "Role:Delete"]), deleteOneController)
	.put(
		checkAccess(["Role:Read", "Role:Update"]),
		validateRequest(rolesSchema),
		putOneController
	);

router
	.route("/")
	.post(
		checkAccess(["Role:Read", "Role:Create"]),
		validateRequest(rolesSchema),
		createOneController
	);

export default router;
