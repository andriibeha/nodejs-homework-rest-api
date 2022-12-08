const express = require("express");

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { contactsSchema, favoriteSchema } = require("../../schema");
const validateMiddleware = validation(contactsSchema);
const validateFavorite = validation(favoriteSchema);

const { contacts: ctrl } = require("../../controllers");
const authenticate = require("../../middlewares/autheticate");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  authenticate,
  validateMiddleware,
  ctrlWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteContactById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateMiddleware,
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavorite,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
