const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { auth } = require("../../controllers");

const { register, login, verifyEmail, resendVerifyEmail } = auth;
const { registerSchema, loginSchema, verifyEmailSchema } = schemas;
const validateRegister = validation(registerSchema);
const validateLogin = validation(loginSchema);
const validateVerifyEmail = validation(verifyEmailSchema);

const router = express.Router();

router.post("/login", validateLogin, ctrlWrapper(login));
router.post("/signup", validateRegister, ctrlWrapper(register));

router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));
router.post("/verify", validateVerifyEmail, ctrlWrapper(resendVerifyEmail));

module.exports = router;
