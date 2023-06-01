import Router from "express";
import { AuthController } from "../controllers/index.js";
import { registerValidation, loginValidation } from "../validations/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";

const authRouter = new Router();

// login
authRouter.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  AuthController.login
);

// registration
authRouter.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  AuthController.register
);

// get user info
authRouter.get("/me", checkAuth, AuthController.getMe);

export { authRouter };
