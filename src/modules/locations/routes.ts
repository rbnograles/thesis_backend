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
import {
	locationSchema,
	locationIdArraySchema,
} from "../../modules/locations/schema";
import { isManyExistingInDatabase } from "../../middlewares/isManyExistingInDatabase";
import { LocationModel } from "./models";

export const router = Router();

router
	.route("/many")
	.get(checkAccess(["Location:Read"]), getManyController)
	.delete(
		checkAccess(["Location:Read", "Location:Delete"]),
		validateArrayOfIds(locationIdArraySchema),
		deleteManyController
	)
	.post(
		checkAccess(["Location:Read", "Location:Create"]),
		validateMany(locationSchema, "locations"),
		checkDuplicates("locations", "name"),
		isManyExistingInDatabase(LocationModel, "name"),
		createManyController
	);

router
	.route("/:id")
	.get(checkAccess(["Location:Read"]), getOneController)
	.put(
		checkAccess(["Location:Read", "Location:Update"]),
		validateRequest(locationSchema),
		putOneController
	)
	.delete(deleteOneController);

router
	.route("/")
	.post(
		checkAccess(["Location:Read", "Location:Create"]),
		validateRequest(locationSchema),
		createOneController
	);

export default router;
