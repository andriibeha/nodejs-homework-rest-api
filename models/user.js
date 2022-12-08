const { Schema, model } = require("mongoose");
const Joi = require("Joi");
const handleSaveError = require("../helpers/handleSaveError");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: { type: String },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
