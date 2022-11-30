const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, upload, authenticate } = require("../../middelwares");
const { schemas } = require("../../models/user");

//signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

//signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
