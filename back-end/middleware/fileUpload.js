const multer  = require('multer');

const storage = multer.diskStorage({
    destination : 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileUpload = multer({ 'storage': storage });

module.exports = fileUpload;