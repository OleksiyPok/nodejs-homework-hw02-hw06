const appRoot = process.cwd();
const { User } = require(appRoot + "/models");
const createError = require("http-errors");

const { errorWrapper } = require(appRoot + "/helpers");

const updateSubscription = async (req, res) => {
  const { id: userid } = req.user;
  const { subscription } = req.body;

  const updatedContact = await User.findByIdAndUpdate(
    userid,
    { subscription },
    { new: true }
  ).exec();

  if (updatedContact === null) {
    throw createError(
      404,
      `The requested user has not been found (id: ${userid})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

module.exports = errorWrapper(updateSubscription);
