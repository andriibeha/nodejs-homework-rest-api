const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempFile, originalname } = req.file;
  const { _id: id } = req.user;
  const imgName = `${id}_${originalname}`;

  try {
    const updatedAvatar = path.join(avatarsDir, imgName);
    const img = await jimp.read(tempFile);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempFile);
    await fs.rename(tempFile, updatedAvatar);
    const avatarURL = path.join("public", "avatars", imgName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink;
    throw error;
  }
};

module.exports = updateAvatar;
