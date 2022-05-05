import { Router } from "express";

// controllers
import { getOneController } from "./_controllers/get";

export const router = Router();

router.route("/:id").get(getOneController);

export default router;
