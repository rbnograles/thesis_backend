import { Router } from "express";

// controllers
import { getManyController, getOneController } from "./_controllers/get";
import {
	createManyController,
	createOneController,
} from "./_controllers/create";
import { putOneController } from "./_controllers/put";
import {
	deleteManyController,
	deleteOneController,
} from "./_controllers/delete";

// validators
import {
	validateMany,
	validateRequest,
	validateArrayOfIds,
} from "../../middlewares/requestValidator";
import { checkAccess } from "../../middlewares/checkAccess";
import { checkDuplicates } from "../../middlewares/checkForDuplicates";

// schemas, models, utilities
import { adminSchema, adminPutSchema, adminIdArraySchema } from "./schema";
import { isManyExistingInDatabase } from "../../middlewares/isManyExistingInDatabase";
import { AdminAccountModel } from "./model";

export const router = Router();

router
	.route("/many")
	.get(checkAccess(["Admin:Read"]), getManyController)
	.delete(
		checkAccess(["Admin:Read", "Admin:Delete"]),
		validateArrayOfIds(adminIdArraySchema),
		deleteManyController
	)
	.post(
		checkAccess(["Admin:Read", "Admin:Create"]),
		validateMany(adminSchema, "admins"),
		checkDuplicates("admins", "username"),
		isManyExistingInDatabase(AdminAccountModel, "username"),
		createManyController
	);

router
	.route("/:id")
	.get(checkAccess(["Admin:Read"]), getOneController)
	.put(
		checkAccess(["Admin:Read", "Admin:Update"]),
		validateRequest(adminPutSchema),
		putOneController
	)
	.delete(checkAccess(["Admin:Read", "Admin:Delete"]), deleteOneController);

router
	.route("/")
	.post(
		checkAccess(["Admin:Read", "Admin:Create"]),
		validateRequest(adminSchema),
		createOneController
	);

export default router;
