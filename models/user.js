const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    avatarURL: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
