const AWS = require('aws-sdk');
const fs = require('fs');

class FileUploadManager {

    constructor() {
        this.AWS_KEY_ID = process.env.AWS_KEY_ID;
        this.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
        this.BUCKET_NAME = 'weblinktech';
     

        // sets the credentials for the aws bucket
        // this.setAWSCredentials()

        AWS.config.update({
            accessKeyId: this.AWS_KEY_ID,
            secretAccessKey: this.AWS_ACCESS_KEY,
            region: 'us-east-1',
        });

        this.s3 = new AWS.S3();
    }

    setAWSCredentials() {
        
    }

    createS3Instance() {
        return new AWS.S3()
    }

    uploadFile(filePath, fileName) {
        console.log('preparing upload');


        fs.readFile(filePath, (error, fileData) => {

            const awsData = {
                Bucket: this.BUCKET_NAME,
                Key: fileName,
                Body: fileData
            }

            this.s3.putObject(awsData, (error, data) => {
                console.log('in putObject')
                if (error) {
                    console.log('error ocurred:', error);
                } else {
                    console.log('successfully upload file')
                }
            })

        })
    
            
        
    }

}

module.exports = FileUploadManager;



