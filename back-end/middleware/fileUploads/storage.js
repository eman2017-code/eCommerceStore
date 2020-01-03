const multer = require('multer')
const uuidv4 = require('uuid/v4')


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.IMAGE_UPLOAD_DIR)
	},
	fileName: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '-' + fileName)
	}
})