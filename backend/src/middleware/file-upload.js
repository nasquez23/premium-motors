const multer = require('multer');
const { config } = require('dotenv');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

config();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});

const BUCKET = process.env.AWS_BUCKET_NAME;

const storage = multer.memoryStorage();

const upload = multer({
    storage
});

exports.upload = upload;

exports.uploadFileToS3 = async (file) => {
    const params = {
        Bucket: BUCKET,
        Key: Date.now().toString() + '-' + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    return params.Key;
};

exports.getImageUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
    });

    return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

exports.deleteFileFromS3 = async (key) => {
    const params = {
        Bucket: BUCKET,
        Key: key,
    };

    await s3.send(new DeleteObjectCommand(params));
};