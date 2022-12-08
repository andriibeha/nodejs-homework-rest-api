const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const renewedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!renewedContact) {
    throw RequestError(404, "Not found");
  }
  res.json(renewedContact);
};

module.exports = updateContactById;
