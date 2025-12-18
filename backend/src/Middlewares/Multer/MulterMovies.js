const multer = require ('multer');
const path = require ('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderMap = {
            poster: '../../assets/Movies/Posters',
            logo: '../../assets/Movies/Logos',
            background: '../../assets/Movies/Backgrounds',
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
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
    const uploadMovies = multer({ storage });

module.exports = uploadMovies;