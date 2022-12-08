const { User } = require("../../models/user");
const {
  requestError,
  createVerifyEmail,
  sendEmailVerify,
} = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw requestError(400, "Missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(400, "Verification has already been passed");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmailVerify(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
