import { Router } from "express";

// controllers
import { loginController, validateCredentials, validateResetPasswordCredentials } from "./_controllers/login";
import { resetPasswordController } from "./_controllers/resetpassword";

export const router = Router();

router.route("/login").post(validateCredentials, loginController);
router.route("/password/reset").post(validateResetPasswordCredentials, resetPasswordController);
