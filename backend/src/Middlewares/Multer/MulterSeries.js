const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderMap = {
            poster: '../../assets/Series/Posters',
            original_poster: '../../assets/Series/Original_Posters',
            background: '../../assets/Series/Backgrounds',
            logo: '../../assets/Series/Logos',
            original_logo: '../../assets/Series/Original_Logos'
        };
        const destination = folderMap[file.fieldname];
        if (destination) {
            cb(null, path.join(__dirname, destination));
        } else {
            cb(new Error('Invalid fieldname'));
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});
const uploadSeries = multer({ storage });

module.exports = uploadSeries;