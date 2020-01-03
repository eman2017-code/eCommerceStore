const multer = require('multer')
const uuidv4 = require('uuid/v4')
const storage = require('./storage.js')


const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
			cb(null, false)
		} else {
    	cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
	}
})


