const express = require("express");
const {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const { users } = require("../../controllers");

const { updateSubscription, current, logout, updateAvatar } = users;
const { subscriptionSchema } = schemas;

const validateSubscription = validation(subscriptionSchema);

const router = express.Router();

router.patch(
  "/:userId/subscription",
  validateSubscription,
  ctrlWrapper(updateSubscription)
);
router.patch(
  "/:userId/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);
router.get("/current", authenticate, ctrlWrapper(current));
router.get("/logout", authenticate, ctrlWrapper(logout));

module.exports = router;
