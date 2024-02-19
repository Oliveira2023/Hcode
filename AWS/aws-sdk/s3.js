import {S3Client as AWS_S3, CreateBucketCommand, DeleteBucketCommand, DeleteObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {readFileSync} from 'fs';

async function main() {

    const region = "us-east-1";
    // const bucketName = `lo-bucket-${Date.now()}`;
    const bucketName = `lo-bucket-1706902953059`;
    const s3 = new AWS_S3({
        region  
          
    })

    await s3.send(new CreateBucketCommand({
        Bucket: bucketName
    }));
    await s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: 'loimage.jpg',
        Body: readFileSync('C:\\Users\\lucia\\OneDrive\\Imagens\\3x4red.jpg'),
    }))
    console.log("Done uploading image");

    setTimeout(async() => {
        await s3.send(new DeleteObjectCommand({
            Bucket: bucketName,
            Key: 'loimage.jpg',
        }));
        await s3.send(new DeleteBucketCommand({
            Bucket: bucketName,
            
        }));
        console.log("Complete");
    }, 30 * 1000)
    

    
}

main()
