import { Router } from "express";

// controllers
import { getManyController, getOneController, getManyControllerFiltered } from "./_controllers/get";
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
import { checkDuplicates } from "../../middlewares/checkForDuplicates";

// schemas, models, utilities
import {
	diseaseSchema,
	diseaseIdArraySchema,
} from "./schema";
import { isManyExistingInDatabase } from "../../middlewares/isManyExistingInDatabase";
import { DiseaseModel } from "./models";

export const router = Router();

router
	.route("/many")
	.get(getManyController)
	.delete(
		validateArrayOfIds(diseaseIdArraySchema),
		deleteManyController
	)
	.post(
		validateMany(diseaseSchema, "diseases"),
		checkDuplicates("locations", "name"),
		isManyExistingInDatabase(DiseaseModel, "name"),
		createManyController
	);

router
	.route("/all")
	.get(getManyControllerFiltered)

router
	.route("/:id")
	.get( getOneController)
	.put(
		validateRequest(diseaseSchema),
		putOneController
	)
	.delete(deleteOneController);

router
	.route("/")
	.post(
		validateRequest(diseaseSchema),
		createOneController
	);

export default router;
