const AWS = require('aws-sdk');
const fs = require('fs');


class FileUploadManager {

    constructor() {
        this.AWS_KEY_ID = process.env.AWS_KEY_ID;
        this.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
        this.REGION = 'us-east-1';
        this.BUCKET_NAME = 'weblinktech';

        // this path is where files are temperarily upload to before getting upload to aws
        this.TEMPERARY_UPLOAD_PATH = `${__dirname}/../public/images/products/`;

        // sets the credentials for the aws bucket
        this.setAWSCredentials()

        this.s3 = new AWS.S3();
    }

    // sets aws credentials so the application has access to the s3 bucket
    setAWSCredentials() {
        AWS.config.update({
            accessKeyId: this.AWS_KEY_ID,
            secretAccessKey: this.AWS_ACCESS_KEY,
            region: this.REGION
        });
    }

    createS3Instance() {
        return new AWS.S3()
    }

    // uploads a file to aws
    uploadFileToAWS(filePath, fileName) {
        fs.readFile(filePath, (error, fileData) => {
            
            // gets object which contains data to tell aws where to upload the file
            const awsData = this.formatAWSData(fileName, fileData);

            this.s3.putObject(awsData, (error, data) => {
                if (error) {
                    console.log('error ocurred:', error);
                } else {
                    console.log('successfully upload file')
                    fs.unlink(filePath); // deletes the file in the local file system
                    
                }
            });
        });            
    }

    // returns an object which tells aws to upload a file
    formatAWSData(fileName, fileData) {
        const awsData = {
            Bucket: this.BUCKET_NAME,
            Key: fileName,
            Body: fileData
        }
        return awsData;
    }

    // uploads a file temperarely to the file system, so it can be read with fs.readFile()
    // this file is later delete after the file is uploaded to aws 
    uploadTemperaryImage(file) {
        file.mv(uploadPath, (error) => {
            if (error) {
              console.log('error uploading file:', error);
            }
        });
    }

}

module.exports = FileUploadManager;



