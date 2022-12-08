const Joi = require("Joi");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = favoriteSchema;
