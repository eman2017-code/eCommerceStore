const AWS = require('aws-sdk');
const fs = require('fs');


class FileUploadManager {

    constructor() {
        this.AWS_KEY_ID = process.env.AWS_KEY_ID;
        this.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
        this.BUCKET_NAME = 'weblinktech';
     

        // sets the credentials for the aws bucket
        this.setAWSCredentials()

        this.s3 = this.createS3Instance()
    }

    setAWSCredentials() {
        AWS.config.update({
            accessKeyId: this.AWS_KEY_ID,
            secretAccessKey: this.AWS_SECRET_KEY,
            region: 'us-east',
        });
    }

    createS3Instance() {
        return new AWS.S3()
    }

    uploadFile(file) {
        console.log('preparing upload');

        fs.readFile(file.path, (fileData, error) => {
            if (!error) {
                const awsData = {
                    Bucket: this.BUCKET_NAME,
                    Key: file.name,
                    Body: fileData
                }

                this.s3.putObject(awsData, (data, error) => {
                    if (error) {
                        console.log('error ocurred:', error);
                    } else {
                        console.log('successfully upload file')
                    }
                })
            }
            
        })
    }

}

module.exports = FileUploadManager;



