const { User } = require("../../models/user");
const {
  RequestError,
  createVerifyEmail,
  sendEmailVerify,
} = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = v4();
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = createVerifyEmail(email, verificationToken);
  await sendEmailVerify(mail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    verificationToken: newUser.verificationToken,
  });
};

module.exports = register;
