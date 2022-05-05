import { Router } from "express";

// controllers
import { getOneController, getAllCountController, updateAllCountController } from "./_controllers/get";

export const router = Router();

router.route("/:id").get(getOneController);

router.route("/count/:id").get(getAllCountController);

router.route("/update/:id").put(updateAllCountController);

export default router;
