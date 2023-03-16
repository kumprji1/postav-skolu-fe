import aws from 'aws-sdk'

const region = process.env.REACT_APP_REGION
const bucketName = process.env.REACT_APP_BUCKET_NAME
const accessKeyId = process.env.REACT_APP_SECRET_KEY
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export const generateUploadURL = async () => {
    const imageName = "img_postav_skolu_" + new Date().toDateString() + '.jpg'

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}