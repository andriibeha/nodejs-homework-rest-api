const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw RequestError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = updateStatusContact;
