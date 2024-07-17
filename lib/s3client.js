import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    forcePathStyle: true,
    region: process.env.NEXT_PUBLIC_SUPABASE_S3_REGION,
    endpoint: process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_SUPABASE_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_SUPABASE_SECRET_ACCESS_KEY,
    },
});


export default s3Client;
