const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(new Error("Add image file"));
  },
});

module.exports = upload;
