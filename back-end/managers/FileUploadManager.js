const multer  = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');


class FileUploadManager {

    constructor() {
        this.AWS_KEY_ID = process.env.AWS_KEY_ID;
        this.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
        this.storage = this.configureDiskStorage();

        // sets the credentials for the aws bucket
        this.setAWSCredentials()

        this.s3 = this.createS3Instance()
        console.log('s3:', this.s3)
    }

    configureDiskStorage() {
        const storage = multer.diskStorage({
            destination : 'uploads/',
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });
        return storage;
    }

    setAWSCredentials() {
        AWS.config.update({
            accessKeyId: this.AWS_KEY_ID,
            secretAccessKey: this.AWS_SECRET_KEY,
            region: 'us-east',
        });
    }

    createS3Instance() {
        console.log('created s3 instance')
        return new AWS.S3()
    }

    uploadFile() {
        console.log('preparing upload');


    }

}

module.exports = FileUploadManager;



