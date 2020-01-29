/*
    This class is responsible for uploading files to the AWS S3 bucket
*/

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');


class FileUploadManager {

    constructor() {
        this.AWS_KEY_ID = process.env.AWS_KEY_ID;
        this.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
        this.REGION = 'us-east-1';
        this.BUCKET_NAME = 'weblinktech';
        this.URL_TO_BUCKET = 'https://weblinktech.s3.us-east-2.amazonaws.com/';

        // this path is where files are temperarily upload to before getting upload to aws
        this.TEMPERARY_UPLOAD_PATH = `${__dirname}/../uploads/`;

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

    // checks if the file names already exists in the bucket
    async validateFileNameIsUnique(newFileName) {
        let validatedFileName = newFileName.repeat(1);
        const fileNames = await this.getAllFileNames();

        let i = 0;
        let fileNameExists = true;
        while(fileNameExists) {
            if (fileNames.includes(validatedFileName) ) {
                i++;
                validatedFileName = this.changeFileName(validatedFileName, i);
            } else {
                fileNameExists = false;
            }
        }
        return validatedFileName;
    }

    // gets a list of all the file names is the bucket
    async getAllFileNames() {
        const response = await this.s3.listObjects(
            { Bucket: this.BUCKET_NAME }
        ).promise()
        const fileNames = response.Contents.map(object => object.Key);
        return fileNames;
    }

    // changes the file name by adding ('some number') to the end
    changeFileName(fileName, i) {
        let newFileName = fileName.repeat(1);
        if (i > 1) {
            newFileName = newFileName.split('');

            const firstIndex = newFileName.findIndex(element => element === '(');
            const lastIndex = newFileName.findIndex(element => element === ')');

            for (let i=firstIndex; i <= lastIndex; i++) {
                delete newFileName[i];
            }
            newFileName = newFileName.join('');
        }
        newFileName = newFileName.split('.');
        newFileName.splice(1, 0, '(' + i + ').'); 
        return newFileName.join('');
    }

    // uploads a file to the aws s3 bucket
    uploadFileToAWS(file, response) {
        const fileName = file.name;
        console.log('file name:', fileName);

        // gets the path to where the file will be temperarily uploaded
        const filePath = this.formatTemperaryFilePath(fileName);
        this.uploadTemperaryFile(file, filePath);

        // reads the file in the temperary location, converting it to data that can 
        // upload to the aws s3 bucket
        fs.readFile(filePath, (error, fileData) => {
            
            // gets object which contains data to tell aws where to upload the file
            const awsData = this.formatAWSDataToUpload(fileName, fileData);

            // uploads the file to the aws s3 bucket
            this.s3.putObject(awsData, (error, data) => {
                if (error) {
                    response.json({
                        data: {},
                        status: {
                            code: 400,
                            message: 'Error uploading file, please try again later.'
                        }
                    });

                } else {
                    console.log('aws upload data:', data);
                    console.log('successfully uploaded file');
                }
            });
        });            
    }

    // removes a existing file from aws and adds a new one
    updateFileInAWS(existingFileName, newFile, response) {
        this.deleteFileFromAWS(existingFileName, response);
        this.uploadFileToAWS(newFile, response);
    }

    // deletes a file from the aws s3 bucket
    deleteFileFromAWS(fileName, response) {
        const awsData = this.formatAWSDataToRemove(fileName);

        this.s3.deleteObject(awsData, (error, data) => {
            if (error) {
                response.json({
                    data: {},
                    status: {
                        code: 400,
                        message: 'Error updating product image, please try again later.'
                    }
                })
            } else {
                console.log('successfully removed file');
            }
        })
    }

    // creates the temperary file path to where the uploaded file is
    formatTemperaryFilePath(fileName) {
        return this.TEMPERARY_UPLOAD_PATH + fileName;
    }

    // returns an object which tells aws to upload a file
    formatAWSDataToUpload(fileName, fileData) {
        const awsData = {
            Bucket: this.BUCKET_NAME,
            Key: fileName,
            Body: fileData
        }
        return awsData;
    }

    // returns an object which tells aws which file to remove
    formatAWSDataToRemove(fileName) {
        const awsData = {
            Bucket: this.BUCKET_NAME,
            Key: fileName
        }
        return awsData
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



