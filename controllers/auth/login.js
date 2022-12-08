const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!user || !comparePassword) {
    throw RequestError(401, "Email or password is incorrect");
  }
  if (!user.verify) {
    throw RequestError(401, "Email not verify");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

module.exports = login;
