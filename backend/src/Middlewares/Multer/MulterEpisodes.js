const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderMap = {
      episode_image: "../../assets/Series/Episodes/Images",
    };

    const destination = folderMap[file.fieldname];
    if (destination) {
      cb(null, path.join(__dirname, destination));
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
      filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const extension = path.extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + extension);
      }
});

const uploadEpisodes = multer({ storage });

module.exports = uploadEpisodes;
