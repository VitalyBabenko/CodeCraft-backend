import { body } from "express-validator";

const errorMessage = {
  email: "Invalid mail format",
  password: "Password must be at least 5 characters long",
  fullName: "Enter a name, min: 2 characters long",
  avatarUrl: "Invalid avatar link",
};

export const loginValidation = [
  body("email", errorMessage.email).isEmail(),
  body("password", errorMessage.password).isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", errorMessage.email).isEmail(),
  body("password", errorMessage.password).isLength({ min: 5 }),
  body("fullName", errorMessage.fullName).isLength({ min: 2 }),
  body("avatarUrl", errorMessage.avatarUrl).optional().isURL(),
];
