import { Router } from "express";

// controllers
import { getManyController, getOneController } from "./_controllers/get";

export const router = Router();

router.route("/many").get(getManyController);

router.route("/:id").get(getOneController);

export default router;
