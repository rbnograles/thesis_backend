import { Router } from "express";

// controllers
import { loginController, validateCredentials, validateResetPasswordCredentials, validateForgotPasswordCredentials } from "./_controllers/login";
import { resetPasswordController } from "./_controllers/resetpassword";
import { forgotPasswordController } from "./_controllers/forgotpassword";

export const router = Router();

router.route("/login").post(validateCredentials, loginController);
router.route("/password/reset").post(validateResetPasswordCredentials, resetPasswordController);
router.route("/password/forgot").post(validateForgotPasswordCredentials, forgotPasswordController);
