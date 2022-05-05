import { Router } from "express";

// controllers
import { getOneController, getAllCountController } from "./_controllers/get";

export const router = Router();

router.route("/:id").get(getOneController);

router.route("/count/:id").get(getAllCountController);

export default router;
