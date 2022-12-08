const createVerifyEmail = (email, verificationToken) => {
  const verificationEmail = {
    to: email,
    from: "sad-rabbit@meta.ua",
    subject: "Verify your email",
    html: `<div>Hello ${email} </div> <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">press here to verify your email</a>`,
  };

  return verificationEmail;
};

module.exports = createVerifyEmail;
