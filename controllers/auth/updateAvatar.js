const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    console.log("REQ", req);
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const extension = originalname.split(".").pop();
    const fileNema = `${_id}.${extension}`;

    const resultUpload = path.join(avatarsDir, fileNema);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", fileNema);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
