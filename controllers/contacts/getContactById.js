const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { contactId: id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

module.exports = getContactById;
