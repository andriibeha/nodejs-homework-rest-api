const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  const { userId } = req.params;
  const { subscription } = req.body;

  const updatedSubscription = await User.findByIdAndUpdate(
    userId,
    { subscription },
    {
      new: true,
    }
  );
  if (!updatedSubscription) {
    throw RequestError(404, "Not found");
  }
  res.json(updatedSubscription);
};

module.exports = updateSubscription;
