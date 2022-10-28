const { User } = require("../../models/user");
const { RequstError } = require("../../helpers/RequstError");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequstError(401, "Email not found");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw RequstError(401, "Password wrong");
  }

  const token = "12sd12312eaws";

  res.json({
    token,
  });
};

module.exports = login;
