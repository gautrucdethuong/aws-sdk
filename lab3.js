import {S3Client, CreateBucketCommand, waitUntilBucketExists, PutObjectCommand} from '@aws-sdk/client-s3';
import {createReadStream} from 'fs';

const s3Client = new S3Client({region: 'ap-southeast-1'})

const bucketName = 'sdk-lab03-techmaster-084728472';

function createBucket(bucketName) {
    const command = new CreateBucketCommand({Bucket: bucketName});
    s3Client.send(command);
}

// createBucket(bucketName);

// waitUntilBucketExists({client: s3Client, maxWaitTime: 2000}, {Bucket: bucketName})
// .then(() => console.log('create bucket completed'));

function putObjectToBucket(bucket, data, key) {
    // Day file len bucket voi data va key
    const command = new PutObjectCommand({Bucket: bucket, Key: key, Body: data})
    s3Client.send(command).then(() => console.log('uploaded'));
}

const lab1ReadableStream = createReadStream('./lab1.js');
putObjectToBucket(bucketName, lab1ReadableStream, 'lab1.js');