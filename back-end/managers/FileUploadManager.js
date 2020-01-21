const AWS = require('aws-sdk');
const fs = require('fs');


class FileUploadManager {

    constructor() {
        this.AWS_KEY_ID = process.env.AWS_KEY_ID;
        this.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
        this.REGION = 'us-east-1';
        this.BUCKET_NAME = 'weblinktech';
        this.URL_TO_BUCKET = 'https://weblinktech.s3.us-east-2.amazonaws.com/';

        // this path is where files are temperarily upload to before getting upload to aws
        this.TEMPERARY_UPLOAD_PATH = `${__dirname}/../public/images/products/`;

        // sets the credentials for the aws bucket
        this.setAWSCredentials()

        this.s3 = this.createS3Instance();
    }

    // sets aws credentials so the application has access to the aws s3 bucket
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

    // uploads a file to the aws s3 bucket
    uploadFileToAWS(file) {
        const fileName = file.name;

        // gets the path to where the file will be temperarily uploaded
        const filePath = this.formatTemperaryFilePath(fileName);

        this.uploadTemperaryFile(file, filePath);

        // reads the file in the temperary location, converting it to data that can 
        // upload to the aws s3 bucket
        fs.readFile(filePath, (error, fileData) => {
            
            // gets object which contains data to tell aws where to upload the file
            const awsData = this.formatAWSData(fileName, fileData);

            // uploads the file to the aws s3 bucket
            this.s3.putObject(awsData, (error, data) => {
                if (error) {
                    console.log('error ocurred:', error);

                } else {
                    console.log('successfully uploaded file');
                }
            });
        });            
    }

    // creates the temperary file path to where the uploaded file is
    formatTemperaryFilePath(fileName) {
        return this.TEMPERARY_UPLOAD_PATH + fileName;
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
    uploadTemperaryFile(file, path) {
        file.mv(path, (error) => {
            if (error) {
              console.log('error uploading file:', error);
            }
        });
    }

    // formats a url which points to the file that was just upload to aws
    getURLToUploadedFile(fileName) {
        return this.URL_TO_BUCKET + fileName;
    }
}

module.exports = FileUploadManager;



