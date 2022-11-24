import * as dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

dotenv.config();

// environment
export const NODE_ENV: string = process.env.NODE_ENV || 'development';

export const APP_VERSION = packageJson.version;
export const APP_NAME = packageJson.name;
export const PORT = process.env.PORT || 3000;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;
export const IMAGE_S3_BUCKET_NAME = process.env.IMAGE_S3_BUCKET_NAME;
export const IMAGE_DISTRIBUTION_DOMAIN = process.env.IMAGE_DISTRIBUTION_DOMAIN;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

export const PASSWORD_SALT = process.env.PASSWORD_SALT;
