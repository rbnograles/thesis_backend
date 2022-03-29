import { Router } from "express";

// controllers
import { createOneController, verifyOneController } from "./_controller/create";

export const router = Router();

router.route("/send").post(createOneController);

router.route("/otp-verify").post(verifyOneController);
