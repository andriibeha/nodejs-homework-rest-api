const Contact = require("../../models/contact");

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const addedContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(addedContact);
};

module.exports = addContact;
