const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderMap = {
            poster: '../../assets/Movies/Posters',
            original_poster: '../../assets/Movies/Original_Posters',
            background: '../../assets/Movies/Backgrounds',
            logo: '../../assets/Movies/Logos',
            original_logo: '../../assets/Movies/Original_Logos'
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
const uploadMovies = multer({ storage });

module.exports = uploadMovies;