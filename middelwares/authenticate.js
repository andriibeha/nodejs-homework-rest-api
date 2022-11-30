const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;
const RequstError = require("../helpers/RequstError");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;

    const [bearer = "", token = ""] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw RequstError(401);
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);

      if (!user) {
        throw Error("Unautorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequstError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
