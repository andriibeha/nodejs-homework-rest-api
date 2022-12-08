const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getAll;
