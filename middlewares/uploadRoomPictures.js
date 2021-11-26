const multer = require('multer');
//global.direccion
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/img/rooms'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({storage});

module.exports = upload;