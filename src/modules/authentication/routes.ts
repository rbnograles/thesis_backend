import { Router } from "express";

// controllers
import { loginController, validateCredentials } from "./_controllers/login";

export const router = Router();

router.route("/login").post(validateCredentials, loginController);
