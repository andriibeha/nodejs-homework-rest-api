const Joi = require("Joi");

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = contactsSchema;
